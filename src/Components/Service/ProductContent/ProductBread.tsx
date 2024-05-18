"use client"
import { useParams } from "next/navigation";
import Link from "next/link";
import { IoChevronForwardSharp } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

//Tenstack & Query
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { GET_PRODUCT_BY_SLUG } from "@/Tenstack/Functions/Product/product";

const ProductBread = () => {
    //Initializing Hook
    const pathname = useParams();

    //Client
    const supabase = createClient();

    //Tenstack
    const { data } = useQuery({
        queryKey: ["productBySlug", pathname.slug],
        queryFn: () => GET_PRODUCT_BY_SLUG(supabase, pathname.slug as string)
    })

    if (!data) return null;

    return (
        <div className="border-b border-solid border-gray-200 mb-7 pb-5">
            <div className="flex gap-3 items-center mb-4">
                <Link href="/" className="block text-base text-gray-700">
                    Home
                </Link>
                <span className="text-gray-400">
                    <IoChevronForwardSharp className="text-lg mt-px" />
                </span>
                <Link href="/" className="block text-base text-gray-700">
                    Services
                </Link>
                <span className="text-gray-400">
                    <IoChevronForwardSharp className="text-lg mt-px" />
                </span>
                <Link href="/" className="text-gray-800">
                    {data.category.name}
                </Link>
            </div>
            <h4 className="text-5xl xl:text-5xl msm:text-4xl sm:text-3xl xxs:text-2xl font-medium">{data.title}</h4>
            <div className="mt-5 flex gap-x-8 items-center xxs:max-md:flex-wrap md:gap-x-8 xxs:gap-x-6 xxs:max-md:gap-y-4">
                <p className="flex gap-2 items-center">
                    <span className="text-base">By</span>
                    <span className="text-base text-main">WEBINUXS</span>
                </p>
                <p className="flex gap-2 items-center">
                    <FaCartArrowDown className="text-main" />
                    <span className="font-semibold">{data.sales}</span>
                    <span className="text-gray-600">sales</span>
                </p>
                <p className="flex gap-2 items-center xxs:max-sm:hidden">
                    <span className="text-green-600 font-medium">Recently Updated</span>
                    <FaCheckCircle className="text-main mt-px " />
                </p>
                <p className="flex gap-2 items-center xxs:max-sm:hidden">
                    <span className="text-green-600 font-medium">Well Documented</span>
                    <FaCheckCircle className="text-main mt-px" />
                </p>
            </div>
        </div>
    );
};

export default ProductBread;