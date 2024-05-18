"use client"
import Link from "next/link";
import Image from "next/image";

//Tenstack & Supabase
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { GET_CART_LIST } from "@/Tenstack/Functions/Cart/cart";
import { Tables } from "@/Tenstack/Types/database.types";

const CarList = () => {
    //Client
    const supabase = createClient();

    //Tenstack
    const { data } = useQuery({
        queryKey: ["cart"],
        queryFn: () => GET_CART_LIST(supabase)
    })

    //Handler
    const getDiscountPrice = (item: Tables<"product">) => {
        if (item.discount_unit === "%") {
            return Math.round(item.regular_price - (item.regular_price * (item.discount / 100)))
        } else {
            return item.regular_price - item.discount
        }
    }

    return (
        <div>
            {Number(data?.length) > 0 &&
                <div className="mb-6">
                    <h4 className="text-2xl font-semibold">Your cart <span className="text-main">list</span></h4>
                    <p className="text-[15px] mt-1 text-gray-600">You can manage cart from cart window.</p>
                </div>
            }
            <div className="grid grid-cols-3 lg:grid-cols-3 lsm:grid-cols-2 xxs:grid-cols-1 gap-8">
                {data?.map((item, i) => (
                    <div className="bg-white text-black rounded-lg overflow-hidden" key={i}>
                        <Link href={`/service/${item.product?.slug}`}>
                            <Image src={item.product?.image_1 as string} alt={item.product?.slug as string} width={1200} height={800} className="aspect-[1200/800]" />
                        </Link>
                        <div className="p-2.5">
                            <Link href={`/service/${item.product?.slug}`} className="text-xl block font-semibold text-primary mb-2">{item.product?.title}</Link>
                            <p className="flex gap-4 text-lg font-semibold">
                                <span className="line-through text-primary">${item.product?.regular_price}</span>
                                <span className="text-xl text-main">${getDiscountPrice(item.product as Tables<"product">)}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {data?.length === 0 &&
                <div>
                    <h6 className="text-xl font-semibold mb-2">Your cart list is empty</h6>
                    <Link href="/" className="text-sm bg-main px-4 py-1.5 rounded block w-max text-white font-semibold">Add to Cart</Link>
                </div>
            }
        </div>
    );
};

export default CarList;