"use client"
import { Fragment, useEffect, useContext, useState, ChangeEvent } from "react";
import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";

//UI
import { Checkbox, Loading } from "../Ui";

//Context
import { CheckoutContext } from "../Context";
import { CartTypes } from "../Context/checkout.content";

//Tenstack & Supabase
import { useQuery, useMutation } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { GET_CART_LIST } from "@/Tenstack/Functions/Cart/cart";
import { CHECK_COUPON } from "@/Tenstack/Functions/Checkout/checkout";
import { Tables } from "@/Tenstack/Types/database.types";

const Cart = () => {
    //Client
    const supabase = createClient();

    //Context
    const { selected, setSelected, price, setPrice, setStep } = useContext(CheckoutContext);

    //State
    const [coupon, setCoupon] = useState<string>("")
    const [discount, setDiscount] = useState<number>(0);

    //Tenstack
    const { data } = useQuery({
        queryKey: ["cart"],
        queryFn: () => GET_CART_LIST(supabase)
    });
    const { isPending, mutate } = useMutation({
        mutationKey: ["checkCoupon"],
        mutationFn: (code: string) => CHECK_COUPON(supabase, code),
        onSuccess: (data) => {
            if (data) {
                let discount: number = 0;
                if (data.discount_unit === "%") {
                    discount = Math.round((Number(price?.subtotal) * (Number(data.discount) / 100)))
                } else {
                    discount = data.discount || 0
                }
                setDiscount(discount)
                toast.success("Discount code applied successfully.")
            } else {
                toast.error("Coupon code is not found or you are using expire coupon code.")
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    //Handler
    const onSingleCheck = (item: CartTypes) => {
        if (selected?.find(a => a.id === item.id)) {
            const updateList = selected.filter(a => a.id !== item.id)
            setSelected?.(updateList)
        } else {
            setSelected?.(prev => [...prev, item])
        }
    }
    const onMainCheck = () => {
        if (data?.every(a => selected?.some(b => a.id === b.id))) {
            setSelected?.([])
        } else {
            if (data) {
                setSelected?.(data)
            }
        }
    }

    //Handler
    const getDiscountPrice = (item: Tables<"product">) => {
        if (item.discount_unit === "%") {
            return Math.round(item.regular_price - (item.regular_price * (item.discount / 100)))
        } else {
            return item.regular_price - item.discount
        }
    }

    //Handler
    const onCouponCheck = () => {
        mutate(coupon)
    }

    //Table Head
    const TABLE_HEAD = ["Checkbox", "Image", "Product Name", "Price", "Quantity", "Total Price", "Action"]


    useEffect(() => {
        if (Number(selected?.length) > 0 && price) {
            const subtotal = selected?.reduce((acc, obj) => acc + getDiscountPrice(obj.product as Tables<"product">), 0);
            setPrice?.((prev) => ({
                ...prev,
                subtotal: subtotal || 0,
                total: (subtotal || 0) - discount,
                discount: discount
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected, discount])

    return (
        <div className="grid grid-cols-12 gap-12 2xl:gap-12 xxs:gap-0 xxs:max-2xl:gap-y-12 mt-14">
            <div className="col-span-8 2xl:col-span-8 xxs:col-span-12">
                <h4 className="text-2xl font-semibold mb-6">Cart <span className="text-main">List</span></h4>
                <div className="overflow-auto">
                    <table className="table-auto w-full min-w-max text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((item, i) => (
                                    <Fragment key={i}>
                                        {item === "Checkbox" ? <th className="text-white border border-solid border-transparent bg-main px-3 rounded-[7px_0px_0px_0px]">
                                            <Checkbox
                                                onChange={() => onMainCheck()}
                                                isLevel={false}
                                                checked={data?.every(a => selected?.some(b => a.id === b.id)) ? true : false}
                                                inputClassName="checked:!bg-white checked:!border-white"
                                                tickClassName="!text-main"
                                            />
                                        </th> :
                                            <th className={`text-white border border-solid border-transparent bg-main px-3 text-base ${TABLE_HEAD.length - 1 === i ? "rounded-[0px_7px_0px_0px]" : ""}`}>{item}</th>
                                        }
                                    </Fragment>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, i) => (
                                <tr key={i}>
                                    <td className="py-2 bg-white px-3 border-b border-l border-r border-solid border-gray-100">
                                        <Checkbox
                                            checked={selected?.find(a => a.id === item.id) ? true : false}
                                            onChange={() => onSingleCheck(item)}
                                            isLevel={false}
                                        />
                                    </td>
                                    <td className="py-2 bg-white px-3 border-b border-l border-r border-solid border-gray-100">
                                        <Image src={item.product?.image_1 as string} alt={item.product?.title as string} width={600} height={400} className="w-[50px] rounded-sm" />
                                    </td>
                                    <td className="w-[300px] py-2 bg-white px-3 border-b border-l border-r border-solid border-gray-100">
                                        {item.product?.title}
                                    </td>
                                    <td className="py-2 bg-white px-3 border-b border-l border-r border-solid border-gray-100">
                                        ${getDiscountPrice(item.product as Tables<"product">)}
                                    </td>
                                    <td className="py-2 bg-white px-3 border-b border-l border-r border-solid border-gray-100">1</td>
                                    <td className="py-2 bg-white px-3 border-b border-l border-r border-solid border-gray-100">${getDiscountPrice(item.product as Tables<"product">) * 1}</td>
                                    <td className="py-2 bg-white px-3 border-b border-l border-r border-solid border-gray-100 text-center">
                                        <div className="text-center">
                                            <AiOutlineDelete className="mx-auto text-xl" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {data?.length === 0 &&
                                <tr>
                                    <td colSpan={TABLE_HEAD.length} className="text-center py-8">
                                        No product on your cart.
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-span-4 2xl:col-span-4 xxs:col-span-12">
                <h4 className="text-2xl font-semibold mb-6">Cart <span className="text-main">Summery</span></h4>
                <div className="p-5 bg-primary text-secondary rounded-md">
                    <h6 className="text-secondary text-xl font-medium mb-1.5">Selected items (2 items)</h6>
                    <div className="overflow-auto">
                        <table className="table-auto w-full min-w-max text-left">
                            <tbody>
                                {selected?.map((item, i) => (
                                    <tr key={i}>
                                        <td className="w-[300px] border-b border-solid border-gray-700 pb-3 pt-2">
                                            <p className="line-clamp-1">{item.product?.title}</p>
                                        </td>
                                        <td className="text-right font-semibold border-b border-solid border-gray-700 pb-3 pt-2">${getDiscountPrice(item.product as Tables<"product">)}</td>
                                    </tr>
                                ))}
                                {selected?.length === 0 &&
                                    <tr>
                                        <td className="w-[300px] border-b border-solid border-gray-700 pb-3 pt-2 text-main">
                                            Please select at least one service.
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <h6 className="text-secondary text-xl font-medium mb-1.5 mt-4">Amount</h6>
                    <div className="overflow-auto">
                        <table className="table-auto w-full min-w-max text-left">
                            <tbody>
                                <tr>
                                    <td className="w-[300px] border-b border-solid border-gray-700 pb-3 pt-2">
                                        Subtotal
                                    </td>
                                    <td className="text-right font-semibold border-b border-solid border-gray-700 pb-3 pt-2">${price?.subtotal}</td>
                                </tr>
                                <tr>
                                    <td className="border-b border-solid border-gray-700 pb-3 pt-2">
                                        Coupon Discount
                                    </td>
                                    <td className="text-right font-semibold border-b border-solid border-gray-700 pb-3 pt-2">${price?.discount}</td>
                                </tr>
                                <tr>
                                    <td className="pb-3 pt-2">
                                        <p className="text-xl font-semibold">Total</p>
                                    </td>
                                    <td className="text-right text-main font-semibold text-xl pb-3 pt-2">${price?.total}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-4">
                    <button className={`bg-main w-full py-3 rounded-md text-white font-semibold ${selected?.length === 0 ? "opacity-50" : ""}`} onClick={() => setStep?.(2)} disabled={selected?.length === 0}>
                        Proceed Checkout (${price?.total})
                    </button>
                </div>
                <div className="flex mt-6">
                    <input
                        placeholder="Type your coupon"
                        className="border border-solid border-gray-200 flex-1 py-2.5 px-3 rounded-s-md focus:outline-none focus:border-main placeholder:text-primary"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        onInput={(e: ChangeEvent<HTMLInputElement>) => {
                            e.target.value = e.target.value.toUpperCase();
                        }}
                    />
                    <button onClick={onCouponCheck} className="text-white px-4 bg-main rounded-e-md relative border border-solid border-main">
                        <span className={`${isPending && "opacity-20"}`}>Apply Coupon</span>
                        {isPending &&
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Loading />
                            </div>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;