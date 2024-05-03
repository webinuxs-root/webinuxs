"use client"
import { useContext } from "react";
import { useRouter } from "next/navigation";

//Context
import { CheckoutContext } from "../Context";

//UI
import { Loading, uniqueId } from "../Ui";

//Tenstack & Query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { GET_PROFILE } from "@/Tenstack/Functions/Account/profile";
import { ADD_ORDER, ADD_ORDER_PRODUCT, DELETE_ALL_CART } from "@/Tenstack/Functions/Checkout/checkout";
import { OrderInput, OrderProductInput } from "@/Tenstack/Types/Checkout/checkout";
import { Tables } from "@/Tenstack/Types/database.types";
import toast from "react-hot-toast";

const Payment = () => {
    //Context
    const { selected, price, setStep, customer } = useContext(CheckoutContext);

    //Client
    const supabase = createClient();

    //Initializing Hook
    const queryClient = useQueryClient();
    const router = useRouter();

    //Handler
    const getDiscountPrice = (item: Tables<"product">) => {
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
    const { isPending: dlPending, mutate: dlMutate } = useMutation({
        mutationKey: ["deleteAllCarts"],
        mutationFn: (formData: string) => DELETE_ALL_CART(supabase, formData),
        onSuccess: () => {
            setStep?.(4)
            router.refresh()
            queryClient.invalidateQueries({ queryKey: ["cart"] })
            toast.success("Order placed successfully. We will contact you soon.")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const { isPending: prPending, mutate: prMutate } = useMutation({
        mutationKey: ["orderProducts"],
        mutationFn: (formData: OrderProductInput[]) => ADD_ORDER_PRODUCT(supabase, formData),
        onSuccess: () => {
            dlMutate(profile?.user?.id as string)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const { isPending, mutate } = useMutation({
        mutationKey: ["orders"],
        mutationFn: (formData: OrderInput) => ADD_ORDER(supabase, formData),
        onSuccess: (data) => {
            const formData = selected?.map((item => ({
                product_id: item.product?.id as string,
                quantity: 1,
                price: getDiscountPrice(item.product as Tables<"product">),
                order_id: data?.id as string
            })))
            prMutate(formData as OrderProductInput[])
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    //Handler
    const onConfirm = () => {
        const formData = {
            subtotal: price?.subtotal as number,
            coupon_discount: price?.discount as number,
            total: price?.total as number,
            first_name: customer?.first_name as string,
            last_name: customer?.last_name as string,
            email: customer?.email as string,
            phone: customer?.phone as string,
            country: customer?.country as string,
            state: customer?.state as string,
            purchase_notes: customer?.purchase_notes as string,
            user_id: profile?.user?.id as string,
            order_id: uniqueId()
        }
        mutate(formData)
    }

    return (
        <div className="grid grid-cols-12 gap-12 mt-14">
            <div className="col-span-8">
                <h4 className="text-2xl font-semibold mb-6">Zero <span className="text-main">Payment</span></h4>
                <div className="border border-solid border-green-600 p-5 bg-green-50 rounded-md">
                    <h4 className="text-2xl font-semibold mb-2">We are not accepting any payment without showing you demo.</h4>
                    <p className="text-base text-gray-600">You don't need to pay during purchasing our service. Here we are using zero payment system. Zero payment system means, you don't need to give any payment when you are purchasing a service from our website. After purchasing your service we will contact with you and show you our demo website. If you choose we will continue further process.</p>
                    <h5 className="my-5 text-lg font-semibold text-green-600">What is our payment policy?</h5>
                    <p className="text-base text-gray-600">Our payment policy is zero payment policy. In this policy you can purchase any kind services from our website without zero payment. Our policy is based on 3 basic steps. Firstly, you can purchase services without paying. Secondly, we will contact you and show you our demos. Lastly if you choose our demo, you can confirmed by paying or can cancel the purchase.</p>
                    <p className="mt-5 bg-green-600 px-3 py-2 text-white rounded w-max">** Please click on confirm purchase button to place an order.</p>
                </div>
                <div className="bg-main mt-12 px-4 py-3 rounded-md text-white">
                    <p className="italic">By placing the order, you are accepting our payment policy. We will contact with you in 2 working days after placing the orders. We will show all demos in live meeting, we believe this will increase trust between us.</p>
                </div>
            </div>
            <div className="col-span-4">
                <h4 className="text-2xl font-semibold mb-6">Cart <span className="text-main">Summery</span></h4>
                <div className="p-5 bg-primary text-secondary rounded-md">
                    <h6 className="text-secondary text-xl font-medium mb-1.5">Selected items (2 items)</h6>
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
                    <h6 className="text-secondary text-xl font-medium mb-1.5 mt-4">Amount</h6>
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
                <div className="mt-4">
                    <button className="bg-main w-full py-3 rounded-md text-white font-semibold relative" onClick={onConfirm} disabled={isPending || prPending || dlPending}>
                        <span className={`${(isPending || prPending || dlPending) && "opacity-20"}`}>Confirm Purchase</span>
                        {(isPending || prPending || dlPending) &&
                            <div className="absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
                                <Loading />
                            </div>
                        }
                    </button>
                </div>
                <div className="mt-4" onClick={() => setStep?.(2)}>
                    <button className="border border-solid border-main text-main w-full rounded-md py-3">
                        Back to Customer Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;