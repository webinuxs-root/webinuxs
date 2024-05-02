"use client"
import { useState } from "react";
import { useParams } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdCheckCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdFileCopy } from "react-icons/md";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { FaClone } from "react-icons/fa6";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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

const ProductInfo = () => {
    //Initializing Hook
    const pathname = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();

    //Client
    const supabase = createClient();

    //State
    const [directBuy, setDirectBuy] = useState<boolean>(false);

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
            <div className="border border-solid border-gray-200 px-4 py-5 rounded-md">
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
                <div className="flex gap-5 mt-5">
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
                <button className="flex gap-3 w-full justify-center items-center mt-4 py-2.5 bg-[#02a799] text-white rounded">
                    <IoLogoWhatsapp />
                    <span>What's App Support</span>
                </button>
                <p className="text-center italic text-sm mt-2">{data.payment}</p>
            </div>
            <div className="border border-solid border-gray-200 px-4 py-5 rounded-md mt-6 flex items-center gap-4">
                <h5 className="text-base font-medium text-gray-700">Share This Service:</h5>
                <div className="flex gap-3 flex-1">
                    <FacebookShareButton url={window.location.href}>
                        <FacebookIcon size={55} borderRadius={5} />
                    </FacebookShareButton>
                    <LinkedinShareButton url={window.location.href} >
                        <LinkedinIcon size={55} borderRadius={5} />
                    </LinkedinShareButton>
                    <TwitterShareButton url={window.location.href} >
                        <TwitterIcon size={55} borderRadius={5} />
                    </TwitterShareButton>
                    <WhatsappShareButton url={window.location.href} >
                        <WhatsappIcon size={55} borderRadius={5} />
                    </WhatsappShareButton>
                    <button className="bg-gray-500 rounded-[5px] px-4 text-white" onClick={() => {
                        navigator.clipboard.writeText(window.location.href)
                    }}>
                        <MdFileCopy className="text-2xl" />
                    </button>
                </div>
            </div>
            <div className="border border-solid border-gray-200 px-4 py-5 rounded-md mt-6">
                <p className="flex gap-6 mb-2.5">
                    <span className="flex-[0_0_35%] font-semibold">Last Updated</span>
                    <span className="flex-1 font-medium text-[#0084B4]">{moment(data.created_at).format("DD MMMM YYYY")}</span>
                </p>
                <p className="flex gap-6 mb-2.5">
                    <span className="flex-[0_0_35%] font-semibold">High Resolution</span>
                    <span className="flex-1 font-medium text-[#0084B4]">{data.resolution ? "Yes" : "No"}</span>
                </p>
                <p className="flex gap-6 mb-2.5">
                    <span className="flex-[0_0_35%] font-semibold">Widget Ready</span>
                    <span className="flex-1 font-medium text-[#0084B4]">{data.widget_ready ? "Yes" : "No"}</span>
                </p>
                <p className="flex gap-6 mb-2.5">
                    <span className="flex-[0_0_35%] font-semibold">Sales</span>
                    <span className="flex-1 font-medium text-[#0084B4]">28230</span>
                </p>
                <p className="flex gap-6 mb-2.5">
                    <span className="flex-[0_0_35%] font-semibold">Documentation</span>
                    <span className="flex-1 font-medium text-[#0084B4]">{data.documentation ? "Yes" : "No"}</span>
                </p>
                <p className="flex gap-6 mb-2.5">
                    <span className="flex-[0_0_35%] font-semibold">Layout</span>
                    <span className="flex-1 font-medium text-[#0084B4]">{data.layout ? "Yes" : "No"}</span>
                </p>
                <p className="flex gap-6 mb-2.5">
                    <span className="flex-[0_0_35%] font-semibold">Keyword</span>
                    <span className="flex-1 font-medium text-[#0084B4]">{data.keyword || "..."}</span>
                </p>
            </div>
            <Link href="/" className="bg-main py-2.5 rounded font-medium text-white mt-6 flex gap-2 justify-center items-center">
                <FaClone />
                <span>Any Website Clone</span>
            </Link>
            <div className="border border-solid border-gray-200 px-4 py-5 rounded-md mt-6 text-center">
                <Image src="/logo-main.png" alt="Webinuxs" width={700} height={700} className="w-[150px] mx-auto" />
                <p className="text-2xl mt-7 font-semibold">Webinuxs</p>
                <p className="text-base text-gray-600">Best Freelance Services</p>
                <p className="mt-5">This is not the end! Beside all the common eCommerce features, GeniusCart has many exclusives features which are not available in most eCommerce stores! You can use this system as single vendor store and if you want to grow your business in futures as ag.</p>
            </div>
        </div>
    );
};

export default ProductInfo;