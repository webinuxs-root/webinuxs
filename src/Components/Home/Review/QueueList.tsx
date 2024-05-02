"use client"
import Marquee from "react-fast-marquee";
import Image from "next/image";

//Tenstack & Supabase
import { createClient } from "@/Supabase/client";
import { useQuery } from "@tanstack/react-query";
import { GET_REVIEW_LIST } from "@/Tenstack/Functions/Home/review";

const QueueList = () => {
    //Client
    const supabase = createClient();

    //Query
    const { data } = useQuery({
        queryKey: ["reviewList"],
        queryFn: () => GET_REVIEW_LIST(supabase)
    })

    return (
        <Marquee>
            {data?.map((item, i) => (
                <div className="flex gap-5 items-center ml-12" key={i}>
                    <Image src={item.image} alt={item.alt} width={400} height={400} className="w-[30px]" />
                    <p className="text-base text-secondary">{item.title}</p>
                </div>
            ))}
        </Marquee>
    );
};

export default QueueList;