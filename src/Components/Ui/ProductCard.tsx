"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdCart } from "react-icons/io";
import { LuShoppingBag } from "react-icons/lu";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

//UI
import { Rating, auth, Loading } from "./";

//Tenstack & Supabase
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { Tables } from "@/Tenstack/Types/database.types";
import { GET_PROFILE } from "@/Tenstack/Functions/Account/profile";
import { GET_CART_LIST } from "@/Tenstack/Functions/Cart/cart";
import { ADD_TO_CART } from "@/Tenstack/Functions/Cart/cart";
import { CartInput } from "@/Tenstack/Types/Cart/cart";

//Interface
interface Props {
    item: Tables<"product">
}

const ProductCard = ({ item }: Props) => {
    //Client
    const supabase = createClient();

    //State
    const [directBuy, setDirectBuy] = useState<boolean>(false);

    //Initializing Hook
    const router = useRouter();
    const queryClient = useQueryClient();

    //Handler
    const getDiscountPrice = () => {
        if (item.discount_unit === "%") {
            return Math.round(item.regular_price - (item.regular_price * (item.discount / 100)))
        } else {
            return item.regular_price - item.discount
        }
    }

    //Tenstack
    const { data: profile } = useQuery({
        queryKey: ["profile"],
        queryFn: () => GET_PROFILE(supabase)
    })
    const { data: cart } = useQuery({
        queryKey: ["cart"],
        queryFn: () => GET_CART_LIST(supabase)
    })
    const { isPending, mutate } = useMutation({
        mutationKey: ["addToCart"],
        mutationFn: (formData: CartInput) => ADD_TO_CART(supabase, formData),
        onSuccess: () => {
            if (directBuy) {
                window.location.href = "/checkout"
            } else {
                router.refresh()
                toast.success("Service added to your cart.")
                queryClient.invalidateQueries({ queryKey: ["cart"] })
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    //Handler
    const onCartHandler = () => {
        if (profile?.user) {
            if (cart?.find(a => a.product_id === item.id)) {
                toast.error("Product is already in your cart.")
            } else {
                const formData = {
                    user_id: profile.user.id,
                    product_id: item.id
                }
                mutate(formData);
            }
        } else {
            auth.login()
        }
    }

    //Handler
    const onDirectBy = () => {
        setDirectBuy(true)
        if (profile?.user) {
            if (cart?.find(a => a.product_id === item.id)) {
                router.push("/checkout")
            } else {
                const formData = {
                    user_id: profile.user.id,
                    product_id: item.id
                }
                mutate(formData);
            }
        } else {
            auth.login()
        }
    }

    return (
        <div className="bg-white text-black rounded-lg overflow-hidden">
            <Link href={`/service/${item.slug}`}>
                <Image src={item.image_1} alt={item.slug} width={1200} height={800} className="aspect-[1200/800]" />
            </Link>
            <div className="p-2.5">
                <Link href={`/service/${item.slug}`} className="text-xl block font-semibold text-primary mb-2">{item.title}</Link>
                <p className="flex gap-4 text-lg font-semibold">
                    <span className="line-through text-primary">${item.regular_price}</span>
                    <span className="text-xl text-main">${getDiscountPrice()}</span>
                </p>
                <div className="flex gap-3 items-center mt-2">
                    <div className="flex-1">
                        <Rating value={item.rating_count} />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button className="bg-main w-[34px] h-9 flex justify-center items-center text-white rounded-md relative" onClick={onCartHandler} disabled={isPending}>
                            <IoMdCart className={`text-xl ${(isPending && !directBuy) && "opacity-20"}`} />
                            {isPending && !directBuy &&
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Loading />
                                </div>
                            }
                        </button>
                        <button className="bg-primary text-white w-[34px] h-9 justify-center items-center flex rounded-md relative" onClick={onDirectBy} disabled={isPending}>
                            <LuShoppingBag className={`text-lg ${(isPending && directBuy) && "opacity-20"}`} />
                            {isPending && directBuy &&
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Loading />
                                </div>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;