"use client"
import { useContext } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { RiErrorWarningFill } from "react-icons/ri";
import toast from "react-hot-toast";

//Context
import { CheckoutContext } from "../Context";

//UI
import { Checkbox, Loading } from "../Ui";

//Tenstack
import { Tables } from "@/Tenstack/Types/database.types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { GET_PROFILE, UPDATE_PROFILE } from "@/Tenstack/Functions/Account/profile";
import { ProfileInput } from "@/Tenstack/Types/Account/profile";

//Interface
interface Inputs {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    purchase_notes: string;
    update: boolean;
}

const Address = () => {
    //Context
    const { selected, price, setStep, setCustomer } = useContext(CheckoutContext);

    //Client
    const supabase = createClient();

    //Initializing Hook
    const queryClient = useQueryClient();

    //Tenstack
    const { data: profile } = useQuery({
        queryKey: ["profile"],
        queryFn: () => GET_PROFILE(supabase)
    })
    const { isPending, mutate } = useMutation({
        mutationKey: ["updateProfile1"],
        mutationFn: (formData: ProfileInput) => UPDATE_PROFILE(supabase, formData),
        onSuccess: () => {
            setStep?.(3)
            queryClient.invalidateQueries({ queryKey: ["profile"] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })


    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm<Inputs>({
        defaultValues: {
            first_name: profile?.user?.user_metadata?.first_name,
            last_name: profile?.user?.user_metadata?.last_name,
            email: profile?.user?.user_metadata?.email,
            phone: profile?.user?.user_metadata?.phone,
            country: profile?.user?.user_metadata?.country,
            state: profile?.user?.user_metadata?.state,
            update: false
        }
    })

    //Handler on Submit
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        if (value.update) {
            const { update, purchase_notes, email, ...rest } = value;
            mutate({ ...rest });
        } else {
            setStep?.(3)
        }
        const { update, ...rest } = value;
        setCustomer?.({ ...rest });
    }

    //Handler
    const getDiscountPrice = (item: Tables<"product">) => {
        if (item.discount_unit === "%") {
            return Math.round(item.regular_price - (item.regular_price * (item.discount / 100)))
        } else {
            return item.regular_price - item.discount
        }
    }

    return (
        <form className="grid grid-cols-12 gap-12 2xl:gap-12 xxs:gap-0 xxs:max-2xl:gap-y-12 mt-14" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-span-8 2xl:col-span-8 xxs:col-span-12">
                <h4 className="text-2xl font-semibold mb-6">Customer <span className="text-main">Details</span></h4>
                <div className="grid grid-cols-2 gap-5">
                    <div className="xxs:max-sm:col-span-2">
                        <label htmlFor="firstName" className="block mb-1.5 text-base text-primary">First Name</label>
                        <input
                            className="border border-solid border-gray-200 w-full px-4 py-2.5 rounded text-[15px] focus:outline-main"
                            placeholder="Type your first name"
                            id="firstName"
                            {...register("first_name", {
                                required: "Please type your first name."
                            })}
                        />
                        {errors.first_name &&
                            <p className="flex items-center mt-1.5 gap-1 text-[15px] text-main">
                                <RiErrorWarningFill />
                                <span>{errors.first_name.message}</span>
                            </p>
                        }
                    </div>
                    <div className="xxs:max-sm:col-span-2">
                        <label htmlFor="lastName" className="block mb-1.5 text-base text-primary">Last Name</label>
                        <input
                            className="border border-solid border-gray-200 w-full px-4 py-2.5 rounded text-[15px] focus:outline-main"
                            placeholder="Type your last name"
                            id="lastName"
                            {...register("last_name", {
                                required: "Please type your last name."
                            })}
                        />
                        {errors.last_name &&
                            <p className="flex items-center mt-1.5 gap-1 text-[15px] text-main">
                                <RiErrorWarningFill />
                                <span>{errors.last_name.message}</span>
                            </p>
                        }
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="email" className="block mb-1.5 text-base text-primary">Email</label>
                        <input
                            className="border border-solid border-gray-200 w-full px-4 py-2.5 rounded text-[15px] focus:outline-main"
                            placeholder="Type your email address"
                            id="email"
                            {...register("email", {
                                required: "Please type your email address.",
                                minLength: {
                                    value: 8,
                                    message: "Please enter at least 8 characters long password."
                                }
                            })}
                        />
                        {errors.email &&
                            <p className="flex items-center mt-1.5 gap-1 text-[15px] text-main">
                                <RiErrorWarningFill />
                                <span>{errors.email.message}</span>
                            </p>
                        }
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="phone" className="block mb-1.5 text-base text-primary">Phone number</label>
                        <input
                            className="border border-solid border-gray-200 w-full px-4 py-2.5 rounded text-[15px] focus:outline-main"
                            placeholder="Type your phone"
                            id="phone"
                            {...register("phone", {
                                required: "Please type your phone number."
                            })}
                        />
                        {errors.phone &&
                            <p className="flex items-center mt-1.5 gap-1 text-[15px] text-main">
                                <RiErrorWarningFill />
                                <span>{errors.phone.message}</span>
                            </p>
                        }
                    </div>
                    <div className="xxs:max-sm:col-span-2">
                        <label htmlFor="country" className="block mb-1.5 text-base text-primary">Country</label>
                        <input
                            className="border border-solid border-gray-200 w-full px-4 py-2.5 rounded text-[15px] focus:outline-main"
                            placeholder="Type your country"
                            id="country"
                            {...register("country", {
                                required: "Please type your country name."
                            })}
                        />
                        {errors.country &&
                            <p className="flex items-center mt-1.5 gap-1 text-[15px] text-main">
                                <RiErrorWarningFill />
                                <span>{errors.country.message}</span>
                            </p>
                        }
                    </div>
                    <div className="xxs:max-sm:col-span-2">
                        <label htmlFor="state" className="block mb-1.5 text-base text-primary">State</label>
                        <input
                            className="border border-solid border-gray-200 w-full px-4 py-2.5 rounded text-[15px] focus:outline-main"
                            placeholder="Type your country"
                            id="state"
                            {...register("state", {
                                required: "Please type your state name."
                            })}
                        />
                        {errors.state &&
                            <p className="flex items-center mt-1.5 gap-1 text-[15px] text-main">
                                <RiErrorWarningFill />
                                <span>{errors.state.message}</span>
                            </p>
                        }
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="purchase_note" className="block mb-1.5 text-base text-primary">Purchase Note</label>
                        <textarea
                            className="border border-solid border-gray-200 w-full px-4 py-2.5 rounded text-[15px] focus:outline-main resize-none"
                            placeholder="Type purchase note"
                            id="purchase_note"
                            {...register("purchase_notes")}
                            rows={5}
                        />
                    </div>
                </div>
                <div>
                    <Controller
                        control={control}
                        name="update"
                        render={({ field: { onChange, value, } }) => (
                            <Checkbox
                                checked={value}
                                onChange={onChange}
                                level="I want to update my profile with this information"
                            />
                        )}
                    />
                </div>
                <p className="text-sm mt-6 italic">We are accepting zero payment system. Place order without paying any payment. After order we will show you demo, and confirmed order.</p>
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
                    <button className="bg-main w-full py-3 rounded-md text-white font-semibold relative" type="submit" disabled={isPending}>
                        <span className={`${isPending && "opacity-20"}`}> Proceed to Payment (${price?.total})</span>
                        {isPending &&
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Loading />
                            </div>
                        }
                    </button>
                </div>
                <div className="mt-4" onClick={() => setStep?.(1)}>
                    <button className="border border-solid border-main text-main w-full rounded-md py-3">
                        Back to Cart List
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Address;