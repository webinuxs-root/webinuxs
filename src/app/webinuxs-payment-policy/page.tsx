import { Metadata } from "next";

//UI
import { Container } from "@/Components/Ui";

//Metadata
export const metadata: Metadata = {
    title: "Our Payment Policy",
    twitter: {
        title: "Our Payment Policy"
    },
    openGraph: {
        title: "Our Payment Policy"
    }
}

const Page = () => {
    return (
        <section className="mt-[120px] mb-[130px]">
            <Container>
                We are working for building Our Payment Policy
            </Container>
        </section>
    );
};

export default Page;