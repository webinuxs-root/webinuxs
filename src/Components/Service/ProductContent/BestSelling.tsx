"use client"
import { useParams } from "next/navigation";

//UI
import { ProductCard, Loading } from "@/Components/Ui";

//Tenstack & Query
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { GET_PRODUCT_BY_SLUG } from "@/Tenstack/Functions/Product/product";
import { GET_SIMILAR_PRODUCT } from "@/Tenstack/Functions/Product/product";
import { Tables } from "@/Tenstack/Types/database.types";

const BestSelling = () => {
    //Initializing Hook
    const pathname = useParams();

    //Client
    const supabase = createClient();

    //Tenstack
    const { data } = useQuery({
        queryKey: ["productBySlug", pathname.slug],
        queryFn: () => GET_PRODUCT_BY_SLUG(supabase, pathname.slug as string)
    })
    const { data: selling, isFetching } = useQuery({
        queryKey: ["productBySlug", data?.category.id],
        queryFn: () => GET_SIMILAR_PRODUCT(supabase, data?.category.id as string)
    })

    return (
        <div className="mt-14">
            <div className="mb-8 w-[35%] 2xl:w-[35%] xl:w-[50%] lg:w-[65%] xxs:w-full">
                <h4 className="text-2xl font-bold mb-2">Similar <span className="text-main">Product</span></h4>
                <p className="text-[15px]">Similar suggested services you may choose.</p>
            </div>
            {isFetching &&
                <div className="mt-2">
                    <Loading size={35} color="black" />
                </div>
            }
            {selling &&
                <div className="grid grid-cols-4 gap-7">
                    {selling?.map((item, i) => (
                        <ProductCard item={item as Tables<"product">} key={i} />
                    ))}
                </div>
            }
        </div>
    );
};

export default BestSelling;