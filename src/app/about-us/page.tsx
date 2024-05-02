//UI
import { Container } from "@/Components/Ui";

//Components
import TopContent from "@/Components/AboutUs/TopContent";
import Support from "@/Components/AboutUs/Support";
import Process from "@/Components/AboutUs/Process";

const Page = () => {
    return (
        <section className="mt-[120px] mb-[130px]">
            <TopContent />
            <Support />
            <Process />
        </section>
    );
};

export default Page;