//UI
import { Container } from "../Ui";

//Components
import { ProductCard } from "../Ui";

//Tenstack & Supabase
import { QueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/server";
import { GET_RECENT_PRODUCT } from "@/Tenstack/Functions/Home/product";
import { Tables } from "@/Tenstack/Types/database.types";

const RecentProduct = async () => {
    //Client
    const supabase = createClient();
    const queryClient = new QueryClient();

    //Query
    const data = await queryClient.fetchQuery({
        queryKey: ["recentProduct"],
        queryFn: () => GET_RECENT_PRODUCT(supabase)
    })

    return (
        <section className="py-14">
            <Container>
                <div className="mb-10">
                    <h4 className="text-3xl font-semibold text-main">Recent Services</h4>
                    <p className="text-primary text-base mt-1.5">Best service with recent</p>
                </div>
                <div className="grid grid-cols-4 gap-7">
                    {data?.map((item, i) => (
                        <ProductCard item={item as Tables<"product">} key={i} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default RecentProduct;