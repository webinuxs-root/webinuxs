import { Metadata } from "next";

//Components
import CarList from "@/Components/MyAccount/Cart/CarList";

//Tenstack & Supabase
import TenstackWrapper from "@/Tenstack/TenstackWrapper";
import { QueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/server";
import { GET_CART_LIST } from "@/Tenstack/Functions/Cart/cart";


//Metadata
export const metadata: Metadata = {
    title: "My Cart",
    twitter: {
        title: "My Cart"
    },
    openGraph: {
        title: "My Cart"
    }
}

const Page = async () => {
    //Client
    const supabase = createClient();
    const queryClient = new QueryClient();

    //Tenstack
    await queryClient.prefetchQuery({
        queryKey: ["cart"],
        queryFn: () => GET_CART_LIST(supabase)
    })

    return (
        <TenstackWrapper client={queryClient}>
            <CarList />
        </TenstackWrapper>
    );
};

export default Page;