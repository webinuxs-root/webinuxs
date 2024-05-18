"use client"
import { Fragment, useState } from "react";
import moment from "moment";
import { IoClose } from "react-icons/io5";
import { FaNoteSticky, FaAddressBook } from "react-icons/fa6";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { BiSolidMessage } from "react-icons/bi";
import toast from "react-hot-toast";

//UI
import { Loading } from "@/Components/Ui";

//Tenstack
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { CANCEL_PURCHASE } from "@/Tenstack/Functions/Checkout/checkout";
import { Tables } from "@/Tenstack/Types/database.types";

//UI
import { Dialog } from "@/Components/Ui";

//Interface
interface Props {
    item: Tables<"orders">
}

const Details = ({ item }: Props) => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    //Client
    const supabase = createClient();

    //Initializing Hook
    const queryClient = useQueryClient();

    //Tenstack
    const { isPending, mutate } = useMutation({
        mutationKey: ["purchase"],
        mutationFn: (id: string) => CANCEL_PURCHASE(supabase, id),
        onSuccess: () => {
            toast.success("Your purchase is cancelled now.")
            queryClient.invalidateQueries({ queryKey: ["purchaseList"] })
            setOpen(false)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    //Handler
    const onCancel = () => {
        mutate(item.id as string)
    }

    return (
        <Fragment>
            <button className="bg-main px-3 xxs:max-sm:mt-2 py-1.5 text-sm font-semibold text-white rounded" onClick={() => setOpen(true)}>View Details</button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                className="w-[800px] lg:w-[800px] md:w-[600px] lsm:w-[550px] msm:w-[500px] sm:w-[420px] xs:w-[320px] xxs:[270px]"
            >
                <div className="border-b flex items-center border-solid border-gray-200 pb-3">
                    <div className="flex-1">
                        <h4 className="text-lg font-semibold text-main">
                            {item.order_id}
                        </h4>
                        <p className="text-[15px]">{moment(item.created_at).format("DD MMM YYYY")}</p>
                    </div>
                    <button className="text-gray-600" onClick={() => setOpen(false)}>
                        <IoClose className="text-2xl" />
                    </button>
                </div>
                <div className="mt-3">
                    <h4 className="flex gap-2 font-semibold items-center">
                        <FaNoteSticky />
                        <span>Purchase <span className="text-main">Notes</span></span>
                    </h4>
                    <p className="text-sm mt-2 text-gray-600">{item.purchase_notes}</p>
                    <h4 className="flex gap-2 mt-5 font-semibold items-center">
                        <HiMiniCurrencyDollar className="text-xl" />
                        <span>Price <span className="text-main">Details</span></span>
                    </h4>
                    <div className="mt-4">
                        <p className="grid grid-cols-4">
                            <span className="text-base font-semibold">Subtotal: </span>
                            <span className="text-base font-semibold">${item.subtotal}</span>
                        </p>
                        <p className="grid grid-cols-4">
                            <span className="text-base font-semibold">Coupon Discount: </span>
                            <span className="text-base font-semibold">${item.coupon_discount}</span>
                        </p>
                        <p className="grid grid-cols-4">
                            <span className="text-lg text-main font-semibold">Total: </span>
                            <span className="text-lg text-main font-semibold">${item.total}</span>
                        </p>
                    </div>
                    <h4 className="flex gap-2 mt-5 font-semibold items-center">
                        <FaAddressBook />
                        <span>Customer <span className="text-main">Details</span></span>
                    </h4>
                    <div className="mt-4">
                        <p className="grid grid-cols-4">
                            <span className="text-base font-medium">First Name: </span>
                            <span className="text-base">{item.first_name}</span>
                        </p>
                        <p className="grid grid-cols-4">
                            <span className="text-base font-medium">Last Name: </span>
                            <span className="text-base">{item.last_name}</span>
                        </p>
                        <p className="grid grid-cols-4">
                            <span className="text-base font-medium">Email: </span>
                            <span className="text-base">{item.email}</span>
                        </p>
                        <p className="grid grid-cols-4">
                            <span className="text-base font-medium">Phone: </span>
                            <span className="text-base">{item.phone}</span>
                        </p>
                        <p className="grid grid-cols-4">
                            <span className="text-base font-medium">Country: </span>
                            <span className="text-base">{item.country}</span>
                        </p>
                        <p className="grid grid-cols-4">
                            <span className="text-base font-medium">State: </span>
                            <span className="text-base">{item.state}</span>
                        </p>
                    </div>
                    {item.our_notes &&
                        <h4 className="flex gap-2 mt-5 font-semibold items-center">
                            <BiSolidMessage />
                            <span>Webinuxs <span className="text-main">Message</span></span>
                        </h4>
                    }
                    {item.our_notes &&
                        <p className="text-sm mt-2 text-main">{item.our_notes}</p>
                    }
                    {item.status !== "cancelled" &&
                        <div className="mt-7">
                            <button className="bg-main text-base text-white py-1.5 px-4 rounded relative" onClick={onCancel}>
                                <span className={`${isPending && "opacity-20"}`}>Cancel Purchase</span>
                                {isPending &&
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <Loading />
                                    </div>
                                }
                            </button>
                        </div>
                    }
                    {item.status === "cancelled" &&
                        <p className="mt-8 text-main font-semibold">You Cancelled this Purchase</p>
                    }
                </div>
            </Dialog>
        </Fragment>
    );
};

export default Details;