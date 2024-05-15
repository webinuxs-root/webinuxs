"use client"
import { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import Image from "next/image";
import { RiDeleteBin4Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { BsFillCartFill } from "react-icons/bs";

//Tenstack Query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { DELETE_CART, GET_CART_LIST } from "@/Tenstack/Functions/Cart/cart";
import { Tables } from "@/Tenstack/Types/database.types";

//UI
import { Loading, useClickOutside } from "@/Components/Ui";


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
    const ref = useRef<HTMLDivElement>(null)

    //Handler
    useClickOutside(ref, () => setOpen(false))

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
            <button className="relative flex-1 py-3.5 text-base font-medium text-gray-700" onClick={() => setOpen(!open)}>
                <span className="xxs:max-sm:hidden">Cart </span>
                <BsFillCartFill className="text-lg hidden xxs:max-sm:inline" />
                <span className="text-main xxs:max-sm:hidden">({cart?.length || 0})</span>
            </button>
            <div className={`absolute bottom-full left-0 w-full bg-gray-50 px-8 sm:px-8 xxs:px-4 pb-14 pt-5 transition-all shadow-5xl ${open ? "translate-y-0 visible opacity-100" : "invisible opacity-0 translate-y-2"}`} ref={ref}>
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
                                        <Image src={item.product?.image_1 as string} alt={item.product?.title as string} width={600} height={400} className="w-[250px] sm:w-[250px] xxs:w-[1000px] rounded-sm" />
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
                        Keep exploring.
                    </p>
                }
                <div className="mt-6">
                    <Link href={"/checkout"} className="bg-main block text-center w-full py-2.5 rounded-md font-semibold text-secondary">Checkout (${cart?.reduce((acc, obj) => acc + getDiscountPrice(obj.product as Tables<"product">), 0)})</Link>
                    <p className="text-sm text-center italic mt-2">You can unselect any selected services in the checkout page.</p>
                </div>
            </div>
        </Fragment>
    );
};

export default Cart;