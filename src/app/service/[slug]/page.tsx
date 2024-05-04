import { Metadata } from "next";

//Components
import ProductContent from "@/Components/Service/ProductContent";

//Tenstack & Supabase
import TenstackWrapper from "@/Tenstack/TenstackWrapper";
import { QueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/server";
import { GET_PRODUCT_BY_SLUG } from "@/Tenstack/Functions/Product/product";
import { GET_PROFILE } from "@/Tenstack/Functions/Account/profile";
import { GET_CART_LIST } from "@/Tenstack/Functions/Cart/cart";

//Interface
interface Props {
    params: {
        slug: string;
    }
}

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
    //Client
    const supabase = createClient();
    const queryClient = new QueryClient();

    //Tenstack Query
    const data = await queryClient.fetchQuery({
        queryKey: ["productBySlug", slug],
        queryFn: () => GET_PRODUCT_BY_SLUG(supabase, slug)
    })

    return {
        title: data?.title,
        twitter: {
            title: data?.title
        },
        openGraph: {
            title: data?.title
        }
    }

}

const Page = async ({ params: { slug } }: Props) => {
    //Client
    const supabase = createClient();
    const queryClient = new QueryClient();

    //Tenstack Query
    await queryClient.prefetchQuery({
        queryKey: ["productBySlug", slug],
        queryFn: () => GET_PRODUCT_BY_SLUG(supabase, slug)
    })
    await queryClient.prefetchQuery({
        queryKey: ["profile"],
        queryFn: () => GET_PROFILE(supabase)
    })
    await queryClient.prefetchQuery({
        queryKey: ["cart"],
        queryFn: () => GET_CART_LIST(supabase)
    })


    return (
        <TenstackWrapper client={queryClient}>
            <ProductContent />
        </TenstackWrapper>
    );
};

export default Page;