"use client"
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { VscPreview } from "react-icons/vsc";
import Link from "next/link";
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineFolderSpecial } from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";
import { MdOutlineReviews } from "react-icons/md";
import { FaCheck, FaShoppingCart, FaClone } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdCheckCircle } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import toast from "react-hot-toast";

//UI
import { auth, Loading } from "@/Components/Ui";

//Tenstack & Query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { GET_PRODUCT_BY_SLUG } from "@/Tenstack/Functions/Product/product";
import { GET_PROFILE } from "@/Tenstack/Functions/Account/profile";
import { ADD_TO_CART } from "@/Tenstack/Functions/Cart/cart";
import { CartInput } from "@/Tenstack/Types/Cart/cart";
import { GET_CART_LIST } from "@/Tenstack/Functions/Cart/cart";

const ProductImage = () => {
    //Initializing Hook
    const pathname = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();

    //State
    const [tab, setTab] = useState<string>("description");
    const [directBuy, setDirectBuy] = useState<boolean>(false);

    //Client
    const supabase = createClient();

    //Tenstack
    const { data } = useQuery({
        queryKey: ["productBySlug", pathname.slug],
        queryFn: () => GET_PRODUCT_BY_SLUG(supabase, pathname.slug as string)
    })
    const { data: profile } = useQuery({
        queryKey: ["profile"],
        queryFn: () => GET_PROFILE(supabase)
    })
    const { data: cart } = useQuery({
        queryKey: ["cart"],
        queryFn: () => GET_CART_LIST(supabase)
    })
    const { isPending, mutate } = useMutation({
        mutationKey: ["addToCart"],
        mutationFn: (formData: CartInput) => ADD_TO_CART(supabase, formData),
        onSuccess: () => {
            if (directBuy) {
                window.location.href = "/checkout";
            } else {
                toast.success("Service added to your cart.")
                router.refresh()
                queryClient.invalidateQueries({ queryKey: ["cart"] })
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const specification: { name: string, value: string }[] = JSON.parse(JSON.stringify(data?.specification || ""))

    if (!data) return null;

    const getDiscountPrice = () => {
        if (data.discount_unit === "%") {
            return Math.round(data.regular_price - (data.regular_price * (data.discount / 100)))
        } else {
            return data.regular_price - data.discount
        }
    }

    //Handler
    const onCartHandler = () => {
        if (profile?.user) {
            if (cart?.find(a => a.product_id === data.id)) {
                toast.error("Product is already in your cart.")
            } else {
                const formData = {
                    user_id: profile.user.id,
                    product_id: data.id
                }
                mutate(formData);
            }
        } else {
            auth.login()
        }
    }

    //Handler
    const onDirectBuy = () => {
        setDirectBuy(true)
        if (profile?.user) {
            if (cart?.find(a => a.product_id === data.id)) {
                router.push("/checkout")
            } else {
                const formData = {
                    user_id: profile.user.id,
                    product_id: data.id
                }
                mutate(formData);
            }
        } else {
            auth.login()
        }
    }

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

            <div className="border border-solid border-gray-200 px-4 py-5 hidden rounded-md xxs:max-xl:block xxs:max-xl:mt-8">
                <div className="flex gap-2 border-b border-solid border-gray-200 pb-4">
                    <h5 className="flex-1 text-xl font-semibold text-gray-700">Regular Price</h5>
                    <div className="flex gap-5 items-center">
                        <h5 className="flex items-start gap-1 text-lg font-medium text-gray-600 line-through">
                            ${data.regular_price}
                        </h5>
                        <h5 className="flex items-start gap-1 text-main">
                            <span className="text-base font-semibold">$</span>
                            <span className="text-3xl font-semibold">{getDiscountPrice()}</span>
                        </h5>
                    </div>
                </div>
                <ul className="mt-3 [&_li]:flex [&_li]:gap-2 [&_li]:my-2 [&_li]:items-center ">
                    <li>
                        <FaCheck className="text-green-600" />
                        <span className="font-semibold text-gray-700">Version: </span>
                        <span className="text-gray-600 font-medium">{data.version}</span>
                    </li>
                    <li>
                        <FaCheck className="text-green-600" />
                        <span className="font-semibold text-gray-700">Brand: </span>
                        <span className="text-gray-600 font-medium">{data.brand}</span>
                    </li>
                    <li>
                        {data.quantity > 1 ? <FaCheck className="text-green-600" /> : <IoClose className="text-red-600" />}
                        <span className="font-semibold text-gray-700">Availability: </span>
                        <span className={`font-semibold text-green-600 ${data.quantity > 1 ? "text-green-600" : "text-red-600"}`}>{data.quantity > 1 ? "In Stock" : "Out of Stock"}</span>
                    </li>
                    {data.included.split("|").map((item, i) => (
                        <li key={i}>
                            <FaCheck className="text-green-600" />
                            <span className="text-gray-600 font-medium">{item}</span>
                        </li>
                    ))}
                </ul>
                <h4 className="mt-4 font-semibold text-gray-700">Features:</h4>
                <ul className="mt-3">
                    {data.features.split(";").map((item, i) => (
                        <li key={i} className="text-sm py-1.5 px-2 border border-solid border-main/25 bg-main/5 rounded mb-1.5 flex gap-2 items-center">
                            <MdCheckCircle className="text-main" />
                            <span>{item.trim()}</span>
                        </li>
                    ))}
                </ul>
                <div className="grid grid-cols-2 sm:grid-cols-2 xxs:grid-cols-1 gap-5 mt-5 sm:gap-5 xxs:gap-4">
                    <button className="flex py-2.5 rounded bg-primary text-white flex-1 gap-2 items-center justify-center relative" onClick={onCartHandler} disabled={isPending}>
                        <FaShoppingCart className={`${(isPending && !directBuy) && "opacity-20"}`} />
                        <span className={`${(isPending && !directBuy) && "opacity-20"}`}>Add To Cart</span>
                        {isPending && !directBuy &&
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Loading />
                            </div>
                        }
                    </button>
                    <button className="flex bg-main py-2.5 rounded text-white flex-1 gap-2 items-center justify-center relative" onClick={onDirectBuy} disabled={isPending}>
                        <LuShoppingBag className={`${(isPending && directBuy) && "opacity-20"}`} />
                        <span className={`${(isPending && directBuy) && "opacity-20"}`}>Purchase Now</span>
                        {isPending && directBuy &&
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Loading />
                            </div>
                        }
                    </button>
                </div>
                <Link href="https://api.whatsapp.com/message/UAXIYNES562EN1" className="flex gap-3 w-full justify-center items-center mt-4 py-2.5 bg-[#02a799] text-white rounded">
                    <IoLogoWhatsapp />
                    <span>What&apos;s App Support</span>
                </Link>
                <p className="text-center italic text-sm mt-2">{data.payment}</p>
            </div>



            <div className="mt-8">
                <div className="mb-5 flex gap-x-5 xxs:max-msm:flex-wrap xxs:max-msm:gap-y-4 sm:gap-x-5 xxs:gap-x-3">
                    <button className={`border border-solid border-main/25 px-5 sm:px-5 xxs:px-3 py-2 rounded font-medium flex items-center gap-2 ${tab === "description" ? "bg-main text-white" : "bg-main/5 text-primary/90"}`} onClick={() => setTab("description")}>
                        <MdOutlineDescription />
                        <span>Description</span>
                    </button>
                    <button className={`border border-solid border-main/25 px-5 sm:px-5 xxs:px-3 py-2 rounded font-medium flex items-center gap-2 ${tab === "specification" ? "bg-main text-white" : "bg-main/5 text-primary/90"}`} onClick={() => setTab("specification")}>
                        <MdOutlineFolderSpecial />
                        <span>Specification</span>
                    </button>
                    <button className={`border border-solid border-main/25 px-5 sm:px-5 xxs:px-3 py-2 rounded font-medium flex items-center gap-2 ${tab === "reviews" ? "bg-main text-white" : "bg-main/5 text-primary/90"}`} onClick={() => setTab("reviews")}>
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
                    <div className="overflow-auto">
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
                                        <td className="py-2 px-3 border-b border-l border-r border-solid whitespace-pre bg-main/5 border-gray-100">{item.value}</td>
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