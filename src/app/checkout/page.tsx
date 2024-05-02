import { redirect } from "next/navigation";

//UI
import { Container } from "@/Components/Ui";

//Components
import Checkout from "@/Components/Checkout";

//Tenstack & Supabase
import TenstackWrapper from "@/Tenstack/TenstackWrapper";
import { QueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/server";
import { GET_PROFILE } from "@/Tenstack/Functions/Account/profile";
import { GET_CART_LIST } from "@/Tenstack/Functions/Cart/cart";

const Page = async () => {
    //Client
    const queryClient = new QueryClient();
    const supabase = createClient();

    //Tenstack
    const profile = await queryClient.fetchQuery({
        queryKey: ["profile"],
        queryFn: () => GET_PROFILE(supabase)
    });
    await queryClient.prefetchQuery({
        queryKey: ["cart"],
        queryFn: () => GET_CART_LIST(supabase)
    })

    if (!profile.user) redirect("/account/login")

    return (
        <TenstackWrapper client={queryClient}>
            <section className="mt-[200px] mb-[130px]">
                <Container>
                    <Checkout />
                </Container>
            </section>
        </TenstackWrapper>
    );
};

export default Page;