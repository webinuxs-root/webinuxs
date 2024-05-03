"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Pagination } from "react-headless-pagination";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import Image from "next/image";

//UI
import { ProductCard, Loading } from "../Ui";

//Tenstack
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { GET_SERVICES } from "@/Tenstack/Functions/Services/service";
import { PaginationInput } from "@/Tenstack/Types/Services/service";

const Products = () => {
    //Initializing Hook
    const searchParams = useSearchParams();

    //State
    const [pagination, setPagination] = useState<PaginationInput>({
        query: searchParams.get("query") || "",
        category: searchParams.get("category") || "",
        page: 0,
        price: [Number(searchParams.get("range")?.split("-")[0] || 500), Number(searchParams.get("range")?.split("-")[1] || 4500)]
    })

    //Client
    const supabase = createClient();

    //Tenstack
    const { data, refetch, isFetching } = useQuery({
        queryKey: ["serviceProduct"],
        queryFn: () => GET_SERVICES(supabase, pagination)
    })

    //Handler
    const onPageChange = (e: number) => {
        setPagination(prev => ({
            ...prev,
            page: e
        }))
    }

    //Lifecycle Hook
    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            query: searchParams.get("query") || "",
            category: searchParams.get("category") || "",
            price: [Number(searchParams.get("range")?.split("-")[0] || 500), Number(searchParams.get("range")?.split("-")[1] || 4500)]
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    useEffect(() => {
        refetch()
    }, [pagination])

    return (
        <div className="col-span-9">
            <div className="flex items-center">
                <div className="flex-1">
                    <h4 className="text-xl">Showing full <span className="text-main">service results</span>, giving you the <span className="font-semibold">widest variety</span> of services at any price.</h4>
                    <p className="text-sm mt-3">{data?.count} services</p>
                </div>
                <div>
                    {isFetching &&
                        <Loading color="black" size={30} />
                    }
                </div>
            </div>
            <div className="grid grid-cols-3 gap-8 mt-9">
                {data?.data?.map((item, i) => (
                    <div key={i}>
                        <ProductCard item={item} />
                    </div>
                ))}
            </div>
            {data?.data?.length === 0 &&
                <div className="text-center mt-5">
                    <Image src="/noitem.jpg" width={400} height={400} alt="Nothing Found" className="mx-auto" />
                    <p className="-mt-7 text-base">No result <span className="text-main">Found</span></p>
                </div>
            }
            <div className="mt-14">
                {Number(data?.totalPage) > 1 &&
                    <Pagination
                        totalPages={data?.totalPage as number}
                        currentPage={data?.page as number}
                        setCurrentPage={onPageChange}
                        truncableText="..."
                        className="flex gap-8 justify-center items-center"
                        edgePageCount={2}
                        middlePagesSiblingCount={2}
                    >
                        <Pagination.PrevButton className="border border-solid border-gray-300 p-2.5 text-gray-600 rounded-full">
                            <HiMiniArrowLongLeft className="text-lg" />
                        </Pagination.PrevButton>
                        <ul className="flex items-center gap-8 justify-center">
                            <Pagination.PageButton
                                activeClassName="text-gray-800 border-gray-800"
                                inactiveClassName="text-gray-500 border-transparent"
                                className="font-semibold border-b-2 px-1 border-solid pb-2 cursor-pointer"
                            />
                        </ul>
                        <Pagination.NextButton className="border border-solid border-gray-300 p-2.5 text-gray-600 rounded-full">
                            <HiMiniArrowLongRight className="text-lg" />
                        </Pagination.NextButton>
                    </Pagination>
                }
            </div>
        </div>
    );
};

export default Products;