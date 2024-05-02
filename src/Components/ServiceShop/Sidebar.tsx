"use client"
import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Slider from "rc-slider";
import "./Css/index.css";
import { FaArrowRight } from "react-icons/fa6";

//Tenstack & Supabase
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { GET_ALL_CATEGORIES } from "@/Tenstack/Functions/Services/service";

const Sidebar = () => {
    //Client
    const supabase = createClient();

    //Initializing Hook
    const searchParams = useSearchParams();
    const router = useRouter();

    //Range
    const rangeSearch = searchParams.get("range");

    //State
    const [range, setRange] = useState<number[]>(rangeSearch ? [Number(rangeSearch.split("-")[0]), Number(rangeSearch.split("-")[1])] : [500, 4500]);

    //Tenstack
    const { data } = useQuery({
        queryKey: ["serviceCategory", searchParams.get("category")],
        queryFn: () => GET_ALL_CATEGORIES(supabase, searchParams.get("category") as string)
    })

    //Handler
    const onPriceChange = (e: number[]) => {
        const currentUrl = new URLSearchParams(Array.from(searchParams.entries()));
        currentUrl.set("range", `${e[0]}-${e[1]}`)
        router.push(`/service?${currentUrl.toString()}`)
    }

    //Handler
    const getUrl = (slug: string) => {
        const currentUrl = new URLSearchParams(Array.from(searchParams.entries()));
        currentUrl.set("category", slug)
        return currentUrl.toString();
    }

    return (
        <div className="col-span-3">
            <div className="bg-primary text-secondary px-4 py-5 rounded-md">
                <h4 className="text-lg font-semibold">Categories</h4>
                <div>
                    {data?.map((item, i) => (
                        <Link href={`/service?${getUrl(item.slug)}`} key={i} className="flex items-center gap-3 my-2 border border-solid border-transparent px-2 py-1.5 rounded-md transition-all hover:border-gray-700 group">
                            <Image src={item.image} alt={item.slug} width={100} height={100} className="w-[28px]" />
                            <span className="flex-1">{item.name}</span>
                            <FaArrowRight className="text-sm opacity-50 group-hover:text-main group-hover:opacity-100 transition-all" />
                        </Link>
                    ))}
                </div>
            </div>
            <div className="bg-primary mt-6 text-secondary px-4 py-5 rounded-md">
                <h4 className="text-lg font-semibold mb-5">Price Range</h4>
                <Slider
                    range
                    step={1}
                    allowCross={false}
                    onChange={(e) => setRange(e as number[])}
                    onChangeComplete={(e) => onPriceChange(e as number[])}
                    value={range}
                    min={200}
                    max={5000}
                />
                <div className="flex mt-2">
                    <p className="flex-1 text-sm">${range[0]}</p>
                    <p className="text-sm">${range[1]}</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;