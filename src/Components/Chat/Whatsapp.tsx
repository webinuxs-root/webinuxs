"use client"
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

const Whatsapp = () => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="fixed bottom-5 lg:bottom-5 xxs:bottom-16 right-5 z-[99999]">
            <button className="bg-[#25d366] text-white p-[14px] rounded-full" onClick={() => setOpen(!open)}>
                <FaWhatsapp className="text-4xl" />
            </button>
            <div className={`absolute bottom-full right-0 mb-5 w-[360px] sm:w-[360px] xxs:w-[320px] rounded-xl overflow-hidden transition-all duration-300 ${open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-3"}`}>
                <div className="bg-[#008069] p-[20px] text-white flex items-center border-b border-solid border-black/10 gap-2">
                    <div>
                        <Image src="/logo-1.png" alt="logo" width={400} height={400} className="w-[65px] h-[65px] rounded-full shadow-[rgba(17,_17,_17,_0.1)_0px_0px_2px_inset]" />
                        <div />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold">Webinuxs</h4>
                        <p className="text-sm mt-1">Typically replies instantly</p>
                    </div>
                    <button className="absolute right-3 top-3 text-gray-300 hover:text-white transition-all p-1" onClick={() => setOpen(false)}>
                        <IoClose />
                    </button>
                </div>
                <div className="bg-[url('/background-whatsapp.jpg')] bg-no-repeat bg-cover bg-center">
                    <div className="p-[20px_70px_20px_20px]">
                        <div className="bg-white rounded-[0px_16px_16px] p-2.5 flex items-end gap-4 relative">
                            <div className="cursor-default select-none">
                                <p className="mb-4 text-[15px]">Hi there 👋</p>
                                <p className="text-[15px]">If you need any custom web applications?</p>
                            </div>
                            <p className="text-[12px] text-gray-500 flex-1 whitespace-nowrap cursor-default select-none">{moment().format("hh:mm A")}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="17" viewBox="0 0 9 17" fill="currentColor" className="absolute fill-white -left-[8px] top-0"><path className="fill-white" d="M0.772965 3.01404C-0.0113096 1.68077 0.950002 0 2.49683 0H9V17L0.772965 3.01404Z" fill="currentColor"></path></svg>
                        </div>
                    </div>
                    <div className="p-[20px] text-center">
                        <Link href="/" className="bg-[#25d366] flex items-center justify-center w-max mx-auto p-[9px_26px] rounded-[50px] shadow-[rgba(0,_0,_0,_0.25)_0px_1px_0px_0px] text-white gap-2 hover:bg-[#4fd878]" target="_blank">
                            <FaWhatsapp className="text-3xl" />
                            <span className="text-base font-semibold">Chat on WhatsApp</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Whatsapp;