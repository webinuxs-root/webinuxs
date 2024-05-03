"use client"
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import Image from "next/image";
import { RiDeleteBin4Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

//Tenstack Query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { DELETE_CART, GET_CART_LIST } from "@/Tenstack/Functions/Cart/cart";
import { Tables } from "@/Tenstack/Types/database.types";

//UI
import { Dialog, Loading } from "@/Components/Ui";


const Cart = () => {
    //State
    const [open, setOpen] = useState<boolean>(false);
    const [current, setCurrent] = useState<string>("");

    //Client
    const supabase = createClient();

    //Initializing Hook
    const queryClient = useQueryClient();
    const router = useRouter();
    const pathname = usePathname();

    //Tenstack
    const { data: cart } = useQuery({
        queryKey: ["cart"],
        queryFn: () => GET_CART_LIST(supabase)
    })
    const { mutate, isPending } = useMutation({
        mutationKey: ["deleteCart"],
        mutationFn: (id: string) => DELETE_CART(supabase, id),
        onSuccess: () => {
            toast.success("Service deleted from your cart.")
            router.refresh()
            queryClient.invalidateQueries({ queryKey: ["cart"] })
            setCurrent("")
        },
        onError: (error) => {
            toast.error(error.message)
            setCurrent("")
        }
    })

    //Handler
    const getDiscountPrice = (item: Tables<"product">) => {
        if (item.discount_unit === "%") {
            return Math.round(item.regular_price - (item.regular_price * (item.discount / 100)))
        } else {
            return item.regular_price - item.discount
        }
    }

    //On Cart Delete
    const onCartDelete = (id: string) => {
        setCurrent(id)
        mutate(id)
    }

    //Lifecycle Hook
    useEffect(() => {
        setOpen(false)
    }, [pathname])

    return (
        <Fragment>
            <button className="bg-primary text-secondary px-3 h-[40px] rounded-md  relative" onClick={() => setOpen(true)}>
                <MdOutlineShoppingCart className="text-xl" />
                <span className="bg-main w-5 h-5 flex items-center justify-center rounded-full absolute -top-1.5 text-sm -right-1.5">
                    {cart?.length || 0}
                </span>
            </button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                mainClassName="!justify-end !items-start !pt-20 !pr-10"
                width={520}
                className="!max-h-[800px]"
            >
                <div className="flex items-start mb-4">
                    <div className="flex-1">
                        <h4 className="text-xl text-gray-600">
                            Your Cart - {cart?.length} Item(s)
                        </h4>
                        <p className="text-[15px] italic mt-px">Subtotal:  <span className="text-main font-semibold">${
                            cart?.reduce((acc, obj) => acc + getDiscountPrice(obj.product as Tables<"product">), 0)
                        }</span></p>
                    </div>
                    <button className="text-xl" onClick={() => setOpen(false)}>
                        <IoClose />
                    </button>
                </div>
                <table>
                    <tbody>
                        {cart?.map((item, i) => {
                            const isLast = i === cart.length - 1;
                            const classes = isLast ? "px-2 py-4" : "px-2 py-4 border-b border-solid border-gray-200"
                            return (
                                <tr key={i}>
                                    <td className={classes}>
                                        <Image src={item.product?.image_1 as string} alt={item.product?.title as string} width={600} height={400} className="w-[250px] rounded-sm" />
                                    </td>
                                    <td className={classes}>
                                        <Link href={`/service/${item.product?.slug}`} className="!line-clamp-2 text-gray-700">{item.product?.title}</Link>
                                    </td>
                                    <td className={classes}>x1</td>
                                    <td className={classes}>${getDiscountPrice(item.product as Tables<"product">)}</td>
                                    <td className={classes}>
                                        <button onClick={() => onCartDelete(item.id)} className="w-[25px] h-[25px] flex items-center justify-center" disabled={isPending}>
                                            {current === item.id ?
                                                <>
                                                    {isPending ?
                                                        <Loading color="black" /> : <RiDeleteBin4Line />
                                                    }
                                                </> : <RiDeleteBin4Line />
                                            }
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {cart?.length === 0 &&
                    <p className="text-main text-center mt-4">No services added yet. <br />
                        Keep exploring 😉
                    </p>
                }
                <div className="mt-6">
                    <Link href={"/checkout"} className="bg-main block text-center w-full py-2.5 rounded-md font-semibold text-secondary">Checkout (${cart?.reduce((acc, obj) => acc + getDiscountPrice(obj.product as Tables<"product">), 0)})</Link>
                    <p className="text-sm text-center italic mt-2">You can unselect any selected services in the checkout page.</p>
                </div>
            </Dialog>
        </Fragment>
    );
};

export default Cart;