"use client"
import { useSearchParams } from "next/navigation";
import { RiHome3Line } from "react-icons/ri";
import Link from "next/link";

//Components
import Sidebar from "./Breadcrumb/Sidebar";

const Breadcrumb = () => {
    //Initializing Hook
    const searchParams = useSearchParams();

    return (
        <div className="grid grid-cols-12 gap-5">
            <div className="flex gap-2 col-span-12 xl:col-span-12 xxs:col-span-8 items-center mb-[50px]">
                <Link href="/">
                    <RiHome3Line />
                </Link>
                <p>/</p>
                <p>Service</p>
                {searchParams.get("category") ?
                    <>
                        <p>/</p>
                        <p className="capitalize">{searchParams.get("category")}</p>
                    </> : <>
                        <p>/</p>
                        <p className="capitalize">All Services</p>
                    </>
                }
            </div>
            <div className="col-span-4 text-right xxs:max-xl:block hidden">
                <Sidebar />
            </div>
        </div>
    );
};

export default Breadcrumb;