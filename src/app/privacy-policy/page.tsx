import { Metadata } from "next";

//UI
import { Container } from "@/Components/Ui";

//Metadata
export const metadata: Metadata = {
    title: "Privacy Policy",
    twitter: {
        title: "Privacy Policy"
    },
    openGraph: {
        title: "Privacy Policy"
    }
}

const Page = () => {
    return (
        <section className="mt-[120px] mb-[130px]">
            <Container>
                We are working for building Privacy Policy.
            </Container>
        </section>
    );
};

export default Page;