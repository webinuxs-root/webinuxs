//UI
import { Container } from "@/Components/Ui";

//Components
import Breadcrumb from "@/Components/ServiceShop/Breadcrumb";
import Sidebar from "@/Components/ServiceShop/Sidebar";
import Products from "@/Components/ServiceShop/Products";

//Tenstack & Supabase
import TenstackWrapper from "@/Tenstack/TenstackWrapper";
import { QueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/server";
import { GET_ALL_CATEGORIES, GET_SERVICES } from "@/Tenstack/Functions/Services/service";

//Interface
interface Props {
    searchParams: {
        category: string;
        query: string;
        range: string;
    }
}

const Page = async ({ searchParams }: Props) => {
    //Client
    const queryClient = new QueryClient();
    const supabase = createClient();

    //Tenstack
    await queryClient.prefetchQuery({
        queryKey: ["serviceCategory", searchParams.category],
        queryFn: () => GET_ALL_CATEGORIES(supabase, searchParams.category)
    })


    const pagination = {
        query: searchParams.query || "",
        category: searchParams.category || "",
        page: 0,
        price: [Number(searchParams.range?.split("-")[0] || 500), Number(searchParams.range?.split("-")[1] || 4500)]
    }

    await queryClient.prefetchQuery({
        queryKey: ["serviceProduct"],
        queryFn: () => GET_SERVICES(supabase, pagination)
    })

    return (
        <TenstackWrapper client={queryClient}>
            <section className="mt-[150px] mb-[130px]">
                <Container>
                    <Breadcrumb />
                    <div className="grid grid-cols-12 gap-12">
                        <Sidebar />
                        <Products />
                    </div>
                </Container>
            </section>
        </TenstackWrapper>
    );
};

export default Page;