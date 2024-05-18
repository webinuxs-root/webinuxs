"use client"
import { Fragment, useState, cloneElement } from "react";
import { MdDashboard } from "react-icons/md";
import { PiSidebarSimpleBold } from "react-icons/pi";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { LuShoppingBag } from "react-icons/lu";
import { IoIosCart, IoMdSettings, IoMdLogOut } from "react-icons/io";
import Link from "next/link";

//UI
import { Drawer, Loading } from "@/Components/Ui";

//Tenstack & Supabase
import { useQuery, useMutation } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { GET_PROFILE } from "@/Tenstack/Functions/Account/profile";
import { LOGOUT_ACCOUNT } from "@/Tenstack/Functions/Account/account";

const ProfileDrawer = () => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    //Initializing Hook
    const pathname = usePathname();

    //Client
    const supabase = createClient();

    //Tenstack
    const { data } = useQuery({
        queryKey: ["profile"],
        queryFn: () => GET_PROFILE(supabase)
    })
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
    const onLogout = () => {
        mutate()
    }

    return (
        <Fragment>
            <button className="gap-2.5 items-center bg-main py-2 px-5 rounded-md text-white hover:bg-primary transition-all hidden xxs:max-xl:flex" onClick={() => setOpen(true)}>
                <PiSidebarSimpleBold />
                <span>Profile</span>
            </button>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className="bg-main text-center py-14 2xl:py-14 xxs:py-8">
                    {data?.user?.user_metadata.image ?
                        <Image src={data?.user?.user_metadata.image} alt="Profile" width={600} height={600} className="w-[110px] rounded-full mx-auto" /> : <Image src={"/profile-placeholder.png"} alt="Profile" width={600} height={600} className="w-[110px] mx-auto" />
                    }
                    {data?.user?.user_metadata.first_name && data?.user?.user_metadata.last_name &&
                        <h4 className="text-lg text-white mt-2">{data?.user?.user_metadata.first_name} {data?.user?.user_metadata.last_name}</h4>
                    }
                    <p className="text-sm text-white mt-2">{data?.user?.email}</p>
                </div>
                <div className="py-4 px-1.5">
                    {ButtonList.map((item, i) => (
                        <Link href={item.url} className={`flex gap-2 px-2.5 py-2 rounded items-center my-1.5 ${item.url === pathname ? "bg-main/10 text-main" : ""}`} key={i}>
                            {cloneElement(item.icon, {
                                className: "text-main"
                            })}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                    <button className="flex gap-2 items-center px-2.5 py-2 rounded w-full text-left my-1.5" onClick={onLogout}>
                        <IoMdLogOut className="text-main" />
                        <span>Logout</span>
                        {isPending &&
                            <Loading color="#FA4F00" size={18} />
                        }
                    </button>
                </div>
            </Drawer>
        </Fragment>
    );
};

export default ProfileDrawer;

export const ButtonList = [
    { name: "Dashboard", url: "/my-account", icon: <MdDashboard /> },
    { name: "My Purchase", url: "/my-account/my-purchase", icon: <LuShoppingBag /> },
    { name: "My Cart", url: "/my-account/my-cart", icon: <IoIosCart /> },
    { name: "Settings", url: "/my-account/settings", icon: <IoMdSettings /> }
]