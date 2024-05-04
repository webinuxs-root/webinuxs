import { Metadata } from "next";

//UI
import { Container } from "@/Components/Ui";

//Metadata
export const metadata: Metadata = {
    title: "Terms & Conditions",
    twitter: {
        title: "Terms & Conditions"
    },
    openGraph: {
        title: "Terms & Conditions"
    }
}

const Page = () => {
    return (
        <section className="mt-[120px] mb-[130px]">
            <Container>
                We are working for building Terms and Conditions.
            </Container>
        </section>
    );
};

export default Page;