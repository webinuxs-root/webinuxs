import { Metadata } from "next";

//Components
import Graph from "@/Components/MyAccount/Dashboard/Graph";

//Metadata
export const metadata: Metadata = {
    title: "My Dashboard",
    twitter: {
        title: "My Dashboard"
    },
    openGraph: {
        title: "My Dashboard"
    }
}

const Page = () => {
    return (
        <div>
            <Graph />
        </div>
    );
};

export default Page;