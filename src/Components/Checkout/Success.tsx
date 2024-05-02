"use client"
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import Link from "next/link";

const Success = () => {
    return (
        <div className="mt-16 text-center">
            <IoCheckmarkCircleOutline className="mx-auto text-6xl text-green-600" />
            <p className="text-2xl font-medium text-gray-700">Thanks for your purchase</p>
            <p className="mt-1.5 text-gray-500q">We will contact you soon for showing up demo.</p>
            <p className="mt-12 text-sm italic text-main">Thanks for buying from Webinuxs.</p>
            <Link href="/" className="mt-8 block w-max mx-auto  text-[15px] bg-main px-5 py-2 text-white font-medium rounded-md">
                View your Order
            </Link>
        </div>
    );
};

export default Success;