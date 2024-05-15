"use client"
import { useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";

//Helpers
import { useClickOutside } from "@/Components/Ui";

//Interface
interface Inputs {
    search: string;
}

const SearchBar = () => {
    //State
    const [search, setSearch] = useState<boolean>(false);

    //Initializing Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<Inputs>();

    //FormData
    const searchValue = watch().search;
    const searchParams = useSearchParams();
    const router = useRouter();

    //Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const currentUrl = new URLSearchParams(Array.from(searchParams.entries()));
        currentUrl.set("query", value.search)
        router.push(`/service?${currentUrl.toString()}`)
    }

    //Initializing Hook
    const ref = useRef<HTMLDivElement | null>(null);

    //Handler
    const onHandler = () => {
        setSearch(false)
        setValue("search", "")
    }
    const onHandler2 = () => {
        setSearch(!search)
        setValue("search", "")
    }

    //Handler
    useClickOutside(ref, onHandler)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative" ref={ref}>
                {!searchValue &&
                    <button className="bg-primary text-secondary px-3 h-[40px] rounded-md" onClick={onHandler2} type="button">
                        <IoSearch className="text-xl" />
                    </button>
                }
                {searchValue &&
                    <button className="bg-main text-secondary px-3 h-[40px] rounded-md" type="submit">
                        <IoSearch className="text-xl" />
                    </button>
                }
                <div className={`h-[40px] absolute top-0 right-full bg-black rounded-md mr-[16px] transition-all ${search ? "w-[450px] md:w-[450px] lsm:w-[350px] msm:w-[260px] sm:w-[230px] xxs:w-[100px]" : "w-0"}`}>
                    <input
                        className="bg-transparent px-3 focus:outline-none w-full h-full rounded-md text-secondary"
                        placeholder="Search what you want...?"
                        {...register("search", { required: true })}
                    />
                </div>
            </div>
        </form>
    );
};

export default SearchBar;