//UI
import { Container } from "../Ui";

//Components
import Left from "./Faq/Left";
import Right from "./Faq/Right";

const Faq = () => {
    return (
        <section className="py-12">
            <Container>
                <div className="mb-8 w-[35%] 2xl:w-[35%] xl:w-[50%] lg:w-[65%] xxs:w-full">
                    <h4 className="text-2xl font-bold mb-2">FAQ & <span className="text-main">Answer</span></h4>
                    <p className="text-[15px]">Welcome to our FAQ section, where we shed light on the most common queries and offer insights into our process and services. We believe that transparency and clarity are key to building trust with our clients.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 xxs:grid-cols-1 gap-6 md:gap-6 xxs:gap-0">
                    <Left />
                    <Right />
                </div>
            </Container>
        </section>
    );
};

export default Faq;