"use client"
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { IoMdClose, IoIosArrowForward } from "react-icons/io";
import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";

//UI
import { Drawer } from "../Ui";

//Data
const Data = [
    { path: "/", name: "Home" },
    { path: "/service", name: "Services" },
    // { path: "/micro", name: "Micro" },
    { path: "/category", name: "Categories" },
    { path: "/about-us", name: "About Us" },
]

const Socials = [
    { icon: <FaFacebookSquare />, url: "https://www.facebook.com/webinuxs/" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/company/webinuxs/" }
]

const MobileNav = () => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="hidden xxs:max-lg:block">
            <button className="bg-main text-secondary px-3 h-[40px] rounded-md" type="button" onClick={() => setOpen(true)}>
                <FaBars className="text-xl" />
            </button>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                placement="left"
                className="px-4 py-4"
            >
                <div className="flex items-center">
                    <Link href="/" className="flex-1 relative">
                        <Image src="/logo-main.png" alt="Webinuxs" width={700} height={700} className="w-[90px]" />
                    </Link>
                    <button className="bg-main/10 text-main p-1.5 rounded" onClick={() => setOpen(false)}>
                        <IoMdClose className="text-lg" />
                    </button>
                </div>
                <div className="mt-10">
                    {Data.map((item, i) => (
                        <Link href={item.path} className="flex px-2 py-1.5 rounded items-center my-1.5" key={i}>
                            <span className="flex-1">{item.name}</span>
                            <IoIosArrowForward className="" />
                        </Link>
                    ))}
                </div>
                <div className="absolute bg-primary text-secondary flex bottom-0 w-full left-0">
                    {Socials.map((item, i) => (
                        <Link target="_blank" href={item.url} key={i} className="text-lg py-4 flex items-center justify-center flex-1 border-r border-solid border-gray-700">
                            {item.icon}
                        </Link>
                    ))}
                </div>
            </Drawer>
        </div>
    );
};

export default MobileNav;