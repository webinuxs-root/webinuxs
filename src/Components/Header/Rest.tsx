import Link from "next/link";

//Components
import Profile from "./Profile/Profile";
import Cart from "./Profile/Cart";
import SearchBar from "./Profile/SearchBar";
import MobileNav from "./MobileNav";

//Tenstack & Supabase
import TenstackWrapper from "@/Tenstack/TenstackWrapper";
import { QueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/server";
import { GET_PROFILE } from "@/Tenstack/Functions/Account/profile";
import { GET_CART_LIST } from "@/Tenstack/Functions/Cart/cart";

const Rest = async () => {
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
            <div className="xxs:max-lg:flex-1 flex justify-end gap-4 items-center">
                <SearchBar />
                <MobileNav />
                <Cart />
                {!data.user &&
                    <>
                        <Link href="/account/login" className="flex items-center justify-center bg-primary px-5 h-[40px] text-secondary rounded-md xxs:max-lg:hidden">
                            <span className="font-semibold uppercase text-sm">Login</span>
                        </Link>
                        <Link href="/account/register" className="flex items-center justify-center bg-main px-5 h-[40px] text-white rounded-md xxs:max-lg:hidden">
                            <span className="font-semibold uppercase text-sm">Register</span>
                        </Link>
                    </>
                }
                {data.user &&
                    <Profile data={data} />
                }
            </div>
        </TenstackWrapper>
    );
};

export default Rest;