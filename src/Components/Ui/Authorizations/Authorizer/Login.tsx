"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { MdError } from "react-icons/md";
import toast from "react-hot-toast";
import Link from "next/link";

//UI
import { Loading, auth } from "@/Components/Ui";

//Tenstack & Supabase
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { LOGIN_ACCOUNT } from "@/Tenstack/Functions/Account/account";
import { RegisterInput } from "@/Tenstack/Types/Account/account";

//Interface
interface Inputs extends RegisterInput {
    terms: boolean;
}

const Login = () => {
    //Client
    const supabase = createClient();

    //Initializing Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<Inputs>({
        defaultValues: {
            terms: true
        }
    });

    //Tenstack
    const { isPending, mutate } = useMutation({
        mutationKey: ["createAccount"],
        mutationFn: (formData: RegisterInput) => LOGIN_ACCOUNT(supabase, formData),
        onSuccess: () => {
            toast.success("User login successful.")
            auth.close()
            location.reload()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    //Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const { terms, ...rest } = value;
        mutate({ ...rest })
    }
    return (
        <div className="bg-primary px-14 py-16 rounded-md text-secondary">
            <h5 className="text-3xl text-gray-200 mb-2">
                Login to Your Account
            </h5>
            <p className="text-gray-400 mb-6">Please fill up the following form for creating account</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <label htmlFor="email" className="block text-lg opacity-90">Email address <span className="text-main">*</span></label>
                    <div className="relative mt-1.5">
                        <input
                            className="bg-transparent border border-solid border-gray-300 py-2 w-full px-3 rounded"
                            placeholder="Type your email"
                            {...register("email", {
                                required: "Please enter a valid email address",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Please enter a valid email address."
                                }
                            })}
                        />
                        {errors.email &&
                            <p className="mt-1 text-sm text-main flex gap-1.5 items-center">
                                <MdError className="text-[17px]" />
                                <span>{errors.email.message}</span>
                            </p>
                        }
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-lg opacity-90">Password <span className="text-main">*</span></label>
                    <div className="relative mt-1.5">
                        <input
                            type="password"
                            className="bg-transparent border border-solid border-gray-300 py-2 w-full px-3 rounded"
                            placeholder="Type your password"
                            {...register("password", {
                                required: "Please enter a strong password.",
                                minLength: {
                                    value: 8,
                                    message: "Please enter at least 8 characters long password."
                                }
                            })}
                        />
                        {errors.password &&
                            <p className="mt-1 text-sm text-main flex gap-1.5 items-center">
                                <MdError className="text-[17px]" />
                                <span>{errors.password.message}</span>
                            </p>
                        }
                    </div>
                </div>
                <div className="mt-8">
                    <button type="submit" className={`w-full bg-main py-3 font-semibold text-base rounded-md relative ${watch().terms ? "" : "opacity-50"}`} disabled={isPending || !watch().terms}>
                        <span className={`${isPending && "opacity-20"}`}>Login  To Account</span>
                        {isPending &&
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Loading size={25} />
                            </div>
                        }
                    </button>
                </div>
            </form>
            <div className="select-none text-center mt-4 text-secondary">
                New in Webinuxs? <Link href="/account/register" className="text-main hover:underline">Create your account.</Link>
            </div>
            <div className="text-center mt-1.5">
                <Link href={"/account/forget-password"} className="block text-main hover:underline">
                    Reset your password?
                </Link>
            </div>
        </div>
    );
};

export default Login;