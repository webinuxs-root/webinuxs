"use client"
import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { VscPreview } from "react-icons/vsc";
import Link from "next/link";
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineFolderSpecial } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";

//Tenstack & Query
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { GET_PRODUCT_BY_SLUG } from "@/Tenstack/Functions/Product/product";

const ProductImage = () => {
    //Initializing Hook
    const pathname = useParams();

    //State
    const [tab, setTab] = useState<string>("description");

    //Client
    const supabase = createClient();

    //Tenstack
    const { data } = useQuery({
        queryKey: ["productBySlug", pathname.slug],
        queryFn: () => GET_PRODUCT_BY_SLUG(supabase, pathname.slug as string)
    })

    const specification: { name: string, value: string }[] = JSON.parse(JSON.stringify(data?.specification || ""))

    if (!data) return null;

    return (
        <div>
            <Image src={data?.image_1 as string} alt={data?.slug as string} width={1200} height={800} className="rounded-lg" />
            <div className="mt-5">
                {data.preview_url &&
                    <Link href={"/"} className="flex justify-center items-center gap-4 bg-main w-max mx-auto px-5 py-1.5 rounded text-white">
                        <span>Live Preview</span>
                        <VscPreview />
                    </Link>
                }
                {data.preview_note &&
                    <p className="border border-solid border-main/25 py-2 mt-5 text-center px-8 rounded-sm bg-main/5 text-lg italic">{data.preview_note}</p>
                }
            </div>
            <hr className="mt-8" />
            <div className="mt-8">
                <div className="mb-5 flex gap-5">
                    <button className={`border border-solid border-main/25 px-5 py-2 rounded font-medium flex items-center gap-2 ${tab === "description" ? "bg-main text-white" : "bg-main/5 text-primary/90"}`} onClick={() => setTab("description")}>
                        <MdOutlineDescription />
                        <span>Description</span>
                    </button>
                    <button className={`border border-solid border-main/25 px-5 py-2 rounded font-medium flex items-center gap-2 ${tab === "specification" ? "bg-main text-white" : "bg-main/5 text-primary/90"}`} onClick={() => setTab("specification")}>
                        <MdOutlineFolderSpecial />
                        <span>Specification</span>
                    </button>
                    <button className={`border border-solid border-main/25 px-5 py-2 rounded font-medium flex items-center gap-2 ${tab === "reviews" ? "bg-main text-white" : "bg-main/5 text-primary/90"}`} onClick={() => setTab("reviews")}>
                        <MdOutlineReviews className="mt-[3px]" />
                        <span>Reviews</span>
                    </button>
                </div>
                <hr className="mb-5" />
                {tab === "description" &&
                    <div className="prose !max-w-full">
                        <div dangerouslySetInnerHTML={{ __html: data.description }} />
                    </div>
                }
                {tab === "specification" &&
                    <div>
                        <table className="table-auto w-full min-w-max text-left">
                            <thead>
                                <tr>
                                    <th colSpan={2} className="text-white border border-solid border-transparent bg-main px-3 py-2 text-lg rounded-t-md">Specification</th>
                                </tr>
                            </thead>
                            <tbody>
                                {specification.map((item, i) => (
                                    <tr key={i}>
                                        <td className="py-2 bg-white px-3 border-b border-l border-r border-solid border-gray-100">{item.name}</td>
                                        <td className="py-2 px-3 border-b border-l border-r border-solid whitespace-pre bg-main/5  border-gray-100">{item.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
                {tab === "reviews" &&
                    <div className="text-gray-700 font-medium">
                        No reviews yet for this service.
                    </div>
                }
            </div>
        </div>
    );
};

export default ProductImage;