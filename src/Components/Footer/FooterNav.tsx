import Link from "next/link";
import { LuShoppingBag } from "react-icons/lu";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaCircleUser } from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";

//Tenstack & Supabase
import TenstackWrapper from "@/Tenstack/TenstackWrapper";
import { QueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/server";
import { GET_PROFILE } from "@/Tenstack/Functions/Account/profile";
import { GET_CART_LIST } from "@/Tenstack/Functions/Cart/cart";
import Cart from "./FooterNav/Cart";

const FooterNav = async () => {
    //Client
    const queryClient = new QueryClient();
    const supabase = createClient();

    //Tenstack
    const data = await queryClient.fetchQuery({
        queryKey: ["profile"],
        queryFn: () => GET_PROFILE(supabase)
    })

    await queryClient.prefetchQuery({
        queryKey: ["cart"],
        queryFn: () => GET_CART_LIST(supabase)
    })

    return (
        <TenstackWrapper client={queryClient}>
            <div className="fixed bottom-0 left-0 w-full bg-white text-black hidden items-center shadow-5xl xxs:max-lg:flex z-[9]">
                <Link href="/" className="flex-1 block text-center py-3.5 text-base font-medium text-gray-700">
                    <span className="xxs:max-sm:hidden">Home</span>
                    <FaHome className="text-[19px] hidden xxs:max-sm:inline" />
                </Link>
                <Cart />
                <div className="flex-1 text-center -mt-7 relative z-[9999]">
                    <Link href="/service" className="w-14 rounded-full h-14 flex justify-center items-center mx-auto bg-white border-4 border-solid border-main">
                        <LuShoppingBag className="text-2xl text-main" />
                    </Link>
                </div>
                {!data.user &&
                    <>
                        <Link href="/account/login" className="flex-1 block text-center py-3.5 text-base font-medium text-gray-700">
                            <span className="xxs:max-sm:hidden">Login</span>
                            <FaCircleUser className="text-[20px] hidden xxs:max-sm:inline" />
                        </Link>
                        <Link href="/account/register" className="flex-1 block text-center py-3.5 text-base font-medium text-gray-700">
                            <span className="xxs:max-sm:hidden">Register</span>
                            <FaRegCircleUser className="text-[19px] hidden xxs:max-sm:inline" />
                        </Link>
                    </>
                }
                {data.user &&
                    <>
                        <Link href="/my-account/my-purchase" className="flex-1 block text-center py-3.5 text-base font-medium text-gray-700">
                            <span className="xxs:max-sm:hidden">Purchase</span>
                            <FaBagShopping className="text-[19px] hidden xxs:max-sm:inline xxs:max-sm:-mt-1" />
                        </Link>
                        <Link href="/my-account" className="flex-1 block text-center py-3.5 text-base font-medium text-gray-700">
                            <span className="xxs:max-sm:hidden">My Profile</span>
                            <FaCircleUser className="text-[20px] hidden xxs:max-sm:inline" />
                        </Link>
                    </>
                }
            </div>
        </TenstackWrapper>
    );
};

export default FooterNav;