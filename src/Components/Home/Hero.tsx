//UI
import { Container } from "../Ui";

//Components
import Banner from "./Hero/Banner";

//Tenstack & Supabase
import { QueryClient } from "@tanstack/react-query";
import TenstackWrapper from "@/Tenstack/TenstackWrapper";
import { createClient } from "@/Supabase/server";
import { GET_BANNER_LIST } from "@/Tenstack/Functions/Home/banner";

const Hero = async () => {
    //Client
    const supabase = createClient();
    const queryClient = new QueryClient();

    //Query
    await queryClient.prefetchQuery({
        queryKey: ["bannerList"],
        queryFn: () => GET_BANNER_LIST(supabase)
    })

    return (
        <TenstackWrapper client={queryClient}>
            <section>
                <Container className="!px-0">
                    <Banner />
                </Container>
            </section>
        </TenstackWrapper>
    );
};

export default Hero;