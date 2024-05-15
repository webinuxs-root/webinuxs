"use client"
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { IoMdLogOut } from "react-icons/io";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

//UI
import { useClickOutside, Loading } from "@/Components/Ui";

//Tenstack & Supabase
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { LOGOUT_ACCOUNT } from "@/Tenstack/Functions/Account/account";

//Interface
interface Props {
    data: {
        user: User
    }
}

const Profile = ({ data }: Props) => {
    //Client
    const supabase = createClient();

    //State
    const [open, setOpen] = useState<boolean>(false);

    //Initializing Hook
    const ref = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    //Tenstack
    const { mutate, isPending } = useMutation({
        mutationKey: ["logout"],
        mutationFn: () => LOGOUT_ACCOUNT(supabase),
        onSuccess: () => {
            location.reload()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    //Handler
    useClickOutside(ref, () => setOpen(false))

    //Handler
    const onLogout = () => {
        mutate()
    }

    //Lifecycle Hook
    useEffect(() => {
        setOpen(false)
    }, [pathname])

    return (
        <div className="relative xxs:max-lg:hidden" ref={ref}>
            <button className="bg-main text-secondary px-3 h-[40px] rounded-md flex items-center gap-2" onClick={() => setOpen(!open)}>
                {data.user.user_metadata.image ? <Image src={data.user.user_metadata.image} alt={data.user.id} width={100} height={100} className="w-[25px] rounded-full" /> : <Image src={"/profile-placeholder.png"} alt={data.user.id} width={100} height={100} className="w-[25px] rounded-full" />}
                <span>My Profile</span>
            </button>
            {open &&
                <div className="absolute right-0 top-full bg-white border border-solid w-max border-main/30 mt-3 rounded-md text-left p-5 text-primary">
                    <div className="flex items-center border-b border-solid border-gray-300 pb-5 mb-5 gap-4">
                        {data.user.user_metadata.image ?
                            <Image src={data.user.user_metadata.image} alt={data.user.id} width={400} height={400} className="w-[63px] rounded-full" /> : <Image src={"/profile-placeholder.png"} alt={data.user.id} width={400} height={400} className="w-[60px]" />}
                        <div>
                            {data.user.user_metadata.first_name && data.user.user_metadata.last_name &&
                                <h4 className="text-lg font-semibold">{data.user.user_metadata.first_name} {data.user.user_metadata.last_name}</h4>
                            }
                            <p className="text-s[15px] mt-px">{data.user.email}</p>
                        </div>
                    </div>
                    <div className="[&_a]:block [&_a]:mb-2.5 [&_a]:text-gray-700 [&_a]:font-medium">
                        <Link href="/my-account">
                            My Profile
                        </Link>
                        <Link href="/my-account/my-purchase">
                            My Purchase
                        </Link>
                        <Link href="/my-account/my-cart">
                            My Cart
                        </Link>
                        <Link href="/my-account/settings">
                            Settings
                        </Link>
                        <hr className="mt-4 mb-2" />
                        <button className="text-main w-full text-left flex items-center gap-1.5" onClick={onLogout} disabled={isPending}>
                            <IoMdLogOut className="mt-[2px]" />
                            <span className="font-semibold flex-1">Logout</span>
                            {isPending &&
                                <span className="mt-1 block">
                                    <Loading color="#FA4F00" size={18} />
                                </span>
                            }
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

export default Profile;