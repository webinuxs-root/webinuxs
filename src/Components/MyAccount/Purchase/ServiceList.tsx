"use client"
import { LiaServicestack } from "react-icons/lia";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

//Components
import { OrderStatus } from "@/Components/Ui";
import Details from "./Details";

//Tenstack & Supabase
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { GET_MY_PURCHASE } from "@/Tenstack/Functions/Account/purchase";
import { Tables } from "@/Tenstack/Types/database.types";

const ServiceList = () => {
    //Client
    const supabase = createClient();

    //Tenstack
    const { data } = useQuery({
        queryKey: ["purchaseList"],
        queryFn: () => GET_MY_PURCHASE(supabase)
    })

    return (
        <div>
            {data?.map((item, i) => (
                <div className="border border-solid mb-6 rounded-sm border-gray-200" key={i}>
                    <div className="border-b flex items-center border-solid border-gray-200 px-5 py-3">
                        <div className="flex-1">
                            <h4 className="text-lg font-semibold text-main">
                                {item.order_id}
                            </h4>
                            <p className="text-[15px]">{moment(item.created_at).format("DD MMM YYYY")}</p>
                        </div>
                        <Details item={item as Tables<"orders">} />
                    </div>
                    <div className="p-2">
                        <OrderStatus status={item.status as string} />
                    </div>
                    <div className="px-5 py-5">
                        <h5 className="flex gap-1.5 items-center">
                            <LiaServicestack className="text-2xl" />
                            <span className="text-lg font-semibold text-primary">Serv<span className="text-main">ices</span></span>
                        </h5>
                        <div className="mt-4">
                            <table className="table-auto w-full min-w-max text-left">
                                <thead>
                                    <tr>
                                        <th className="py-3 px-2">No.</th>
                                        <th className="py-3 px-2">Image</th>
                                        <th className="py-3 px-2">Title</th>
                                        <th className="py-3 px-2">Quantity</th>
                                        <th className="py-3 px-2">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.order_products.map((order, i) => (
                                        <tr key={i}>
                                            <td className="py-3 px-2">{i + 1}</td>
                                            <td className="py-3 px-2">
                                                <Image src={order.product?.image_1 as string} alt={order.product?.title as string} width={600} height={400} className="w-[60px]" />
                                            </td>
                                            <td className="py-3 px-2">{order.product?.title}</td>
                                            <td className="py-3 px-2">×{order.quantity}</td>
                                            <td className="py-3 px-2">${order.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ))}
            {data?.length === 0 &&
                <div>
                    <h6 className="text-xl font-semibold mb-2">Your order list is empty</h6>
                    <Link href="/" className="text-sm bg-main px-4 py-1.5 rounded block w-max text-white font-semibold">Place an Order Now</Link>
                </div>
            }
        </div>
    );
};

export default ServiceList;