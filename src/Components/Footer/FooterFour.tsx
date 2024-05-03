"use client"
import { useState } from "react";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import Link from "next/link";

//Components
import ComingSoon from "./FooterFour/ComingSoon";

//Const Data
const Data = [
    { icon: <FaFacebookSquare />, url: "https://www.facebook.com/webinuxs/" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/company/webinuxs/" }
]

const FooterFour = () => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="mt-20">
            <h4 className="text-xl font-medium mb-3">Get Webinuxs App</h4>
            <Image src="/google-play-badge.png" alt="Google Play" width={240} height={92.88} className="w-[160px] -ml-2 cursor-pointer" onClick={() => setOpen(!open)} />
            <h4 className="text-xl font-medium mb-3 mt-5">Get Attached</h4>
            <ul className="flex gap-3 items-center">
                {Data.map((item, i) => (
                    <li key={i}>
                        <Link href={item.url} key={i} className="text-lg">
                            {item.icon}
                        </Link>
                    </li>
                ))}
            </ul>
            <ComingSoon
                open={open}
                onClose={() => setOpen(false)}
            />
        </div>
    );
};

export default FooterFour;