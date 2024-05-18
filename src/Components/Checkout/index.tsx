"use client"
import { useState } from "react";
import { IoMdCart } from "react-icons/io";
import { FaAddressCard } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

//Context
import { CheckoutContext } from "../Context";
import { CartTypes, PriceTypes, CustomerTypes } from "../Context/checkout.content";

//Components
import Cart from "./Cart";
import Address from "./Address";
import Payment from "./Payment";
import Success from "./Success";

//Tenstack & Supabase
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { GET_CART_LIST } from "@/Tenstack/Functions/Cart/cart";
import { Tables } from "@/Tenstack/Types/database.types";

const Checkout = () => {
    //Client
    const supabase = createClient();

    //Tenstack
    const { data } = useQuery({
        queryKey: ["cart"],
        queryFn: () => GET_CART_LIST(supabase)
    });

    //Handler
    const getDiscountPrice = (item: Tables<"product">) => {
        if (item.discount_unit === "%") {
            return Math.round(item.regular_price - (item.regular_price * (item.discount / 100)))
        } else {
            return item.regular_price - item.discount
        }
    }

    //Total
    const subtotal = data?.reduce((acc, obj) => acc + getDiscountPrice(obj.product as Tables<"product">), 0) || 0;

    //State
    const [step, setStep] = useState<number>(1);
    const [selected, setSelected] = useState<CartTypes[]>(data || []);
    const [price, setPrice] = useState<PriceTypes>({
        subtotal: subtotal,
        total: subtotal - 0,
        discount: 0
    })
    const [customer, setCustomer] = useState<CustomerTypes>({} as CustomerTypes);

    return (
        <div>
            <div className="w-[65%] lsm:w-[65%] xxs:w-full mx-auto">
                <div className="w-full relative flex items-center justify-between">
                    {StepperBtn.map((item, i) => (
                        <div className={`relative z-10 grid place-items-center rounded-full font-bold transition-all duration-300`} key={i}>
                            <span className={`text-xl rounded-full p-4 ${step === (i + 1) ? "bg-main text-white" : step > (i + 1) ? "bg-main text-white" : "bg-[#f2f4f6]"}`}>
                                {step > (i + 1) ? <IoCheckmarkDoneSharp /> : item.icon}
                            </span>
                        </div>
                    ))}
                    <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-2 bg-[#f2f4f6]" />
                    <div className={`absolute left-2 top-1/2 -translate-y-1/2 h-2 bg-main/30`} style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "96%" }} />
                </div>
            </div>
            <CheckoutContext.Provider value={{ step, setStep, selected, setSelected, price, setPrice, customer, setCustomer }}>
                {step === 1 &&
                    <Cart />
                }
                {step === 2 &&
                    <Address />
                }
                {step === 3 &&
                    <Payment />
                }
                {step === 4 &&
                    <Success />
                }
            </CheckoutContext.Provider>
        </div>
    );
};

export default Checkout;

export const StepperBtn = [
    {
        icon: <IoMdCart />,
        id: 1
    },
    {
        icon: <FaAddressCard />,
        id: 2
    },
    {
        icon: <MdPayment />,
        id: 3
    }
]