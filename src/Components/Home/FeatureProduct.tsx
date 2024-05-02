//UI
import { Container } from "../Ui";

//Components
import { ProductCard } from "../Ui";

//Tenstack & Supabase
import { QueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/server";
import { GET_HOME_PRODUCT_LIST } from "@/Tenstack/Functions/Home/product";
import { Tables } from "@/Tenstack/Types/database.types";

const FeatureProduct = async () => {
    //Client
    const supabase = createClient();
    const queryClient = new QueryClient();

    //Query
    const data = await queryClient.fetchQuery({
        queryKey: ["featureProduct"],
        queryFn: () => GET_HOME_PRODUCT_LIST(supabase)
    })

    return (
        <section className="py-12">
            <Container>
                <div className="mb-10">
                    <h4 className="text-3xl font-semibold text-main">Feature Services</h4>
                    <p className="text-primary text-base mt-1.5">Best service with features</p>
                </div>
                <div className="grid grid-cols-4 gap-7">
                    {data?.map((item, i) => (
                        <ProductCard item={item.product as Tables<"product">} key={i} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default FeatureProduct;