//UI
import { Container } from "@/Components/Ui";

//Components
import CategoryList from "@/Components/Category/CategoryList";

//Tenstack & Supabase
import { QueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/server";
import { GET_ALL_CATEGORIES } from "@/Tenstack/Functions/Services/service";
import { Tables } from "@/Tenstack/Types/database.types";

const Page = async () => {
    //Client
    const queryClient = new QueryClient();
    const supabase = createClient();

    //Tenstack
    const data = await queryClient.fetchQuery({
        queryKey: ["serviceCategory"],
        queryFn: () => GET_ALL_CATEGORIES(supabase, "")
    })

    return (
        <section className="mt-[120px] mb-[130px]">
            <Container>
                <CategoryList data={data as Tables<"category">[]} />
            </Container>
        </section>
    );
};

export default Page;