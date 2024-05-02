//Components
import ServiceList from "@/Components/MyAccount/Purchase/ServiceList";

//Tenstack & Supabase
import TenstackWrapper from "@/Tenstack/TenstackWrapper";
import { QueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/server";
import { GET_MY_PURCHASE } from "@/Tenstack/Functions/Account/purchase";

const Page = async () => {
    //Client
    const supabase = createClient();
    const queryClient = new QueryClient();

    //Tenstack
    await queryClient.prefetchQuery({
        queryKey: ["purchaseList"],
        queryFn: () => GET_MY_PURCHASE(supabase)
    })

    return (
        <TenstackWrapper client={queryClient}>
            <ServiceList />
        </TenstackWrapper>
    );
};

export default Page;