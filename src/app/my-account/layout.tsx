import { ReactNode } from "react";
import { redirect } from "next/navigation";

//UI
import { Container } from "@/Components/Ui";

//Components
import Sidebar from "@/Components/MyAccount/Sidebar";

//Tenstack and Supabase
import TenstackWrapper from "@/Tenstack/TenstackWrapper";
import { QueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/server";
import { GET_PROFILE } from "@/Tenstack/Functions/Account/profile";

const Layout = async ({ children }: { children: ReactNode }) => {
    //Client
    const supabase = createClient();
    const queryClient = new QueryClient();

    //Tenstack
    const data = await queryClient.fetchQuery({
        queryKey: ["profile"],
        queryFn: () => GET_PROFILE(supabase)
    })

    if (!data.user) redirect("/account/login")

    return (
        <TenstackWrapper client={queryClient}>
            <section className="mt-[150px] mb-[130px]">
                <Container className="">
                    <div className="grid grid-cols-12 gap-14">
                        <div className="col-span-3">
                            <Sidebar />
                        </div>
                        <div className="col-span-9">
                            {children}
                        </div>
                    </div>
                </Container>
            </section>
        </TenstackWrapper>
    );
};

export default Layout;