//UI
import { Container } from "../Ui";

//Components
import QueueList from "./Review/QueueList";

//Tenstack & Supabase
import TenstackWrapper from "@/Tenstack/TenstackWrapper";
import { QueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/server";
import { GET_REVIEW_LIST } from "@/Tenstack/Functions/Home/review";

const ClientReview = async () => {
    //Client
    const supabase = createClient();
    const queryClient = new QueryClient();

    //Query
    await queryClient.prefetchQuery({
        queryKey: ["reviewList"],
        queryFn: () => GET_REVIEW_LIST(supabase)
    })

    return (
        <TenstackWrapper client={queryClient}>
            <section className="py-12">
                <Container className="!px-0 bg-primary py-6 text-secondary">
                    <QueueList />
                </Container>
            </section>
        </TenstackWrapper>
    );
};

export default ClientReview;