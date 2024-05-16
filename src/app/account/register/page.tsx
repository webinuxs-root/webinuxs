import { Metadata } from "next";
import { redirect } from "next/navigation";

//UI
import { Container } from "@/Components/Ui";

//Components
import Content from "@/Components/Account/Register/Content";
import Form from "@/Components/Account/Register/Form";
import Illustration from "@/Components/Account/Illustration";

//Tenstack & Supabase
import { QueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/server";
import { GET_PROFILE } from "@/Tenstack/Functions/Account/profile";

//Metadata
export const metadata: Metadata = {
    title: "Register",
    twitter: {
        title: "Register"
    },
    openGraph: {
        title: "Register"
    }
}

const Page = async () => {
    //Client
    const queryClient = new QueryClient();
    const supabase = createClient();

    //Tenstack
    const data = await queryClient.fetchQuery({
        queryKey: ["profile"],
        queryFn: () => GET_PROFILE(supabase)
    })

    if (data.user) redirect("/")

    return (
        <section className="pt-[280px] pb-[200px] bg-secondary">
            <Container className="!px-36 lg:!px-36 msm:!px-5 xxs:!px-4">
                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-7 xxs:max-2xl:hidden relative">
                        <Content />
                        <div className="absolute top-1/2 right-full z-10 w-[180px] h-auto -translate-y-1/2">
                            <Illustration />
                        </div>
                    </div>
                    <div className="col-span-5 xxs:max-2xl:col-span-12 relative">
                        <Form />
                        <div className="absolute top-1/2 left-[95%] z-10 w-[180px] h-auto -translate-y-1/2 xxs:max-2xl:hidden">
                            <Illustration />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Page;