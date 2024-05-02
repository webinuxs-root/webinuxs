"use client"
import { useSearchParams } from "next/navigation";

import { RiHome3Line } from "react-icons/ri";
import Link from "next/link";

const Breadcrumb = () => {
    //Initializing Hook
    const searchParams = useSearchParams();


    return (
        <div className="flex gap-2 items-center mb-[50px]">
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
    );
};

export default Breadcrumb;