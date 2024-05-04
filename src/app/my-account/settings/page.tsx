import { Metadata } from "next";

//Components
import ProfileSettings from "@/Components/MyAccount/Settings/ProfileSettings";

//Metadata
export const metadata: Metadata = {
    title: "Settings",
    twitter: {
        title: "Settings"
    },
    openGraph: {
        title: "Settings"
    }
}

const Page = async () => {
    return (
        <div>
            <ProfileSettings />
        </div>
    );
};

export default Page;