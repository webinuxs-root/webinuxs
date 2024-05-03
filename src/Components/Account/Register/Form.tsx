"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { MdError } from "react-icons/md";
import toast from "react-hot-toast";
import Link from "next/link";

//UI
import { Loading } from "@/Components/Ui";

//Tenstack & Supabase
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { CREATE_ACCOUNT } from "@/Tenstack/Functions/Account/account";
import { RegisterInput } from "@/Tenstack/Types/Account/account";

//Interface
interface Inputs extends RegisterInput {
    terms: boolean;
}

const Form = () => {
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
        mutationFn: (formData: RegisterInput) => CREATE_ACCOUNT(supabase, formData),
        onSuccess: () => {
            toast.success("User registration successfully.")
            window.location.href = "/"
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
                Create Your Account
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
                <div className="flex mt-4 gap-x-3 md:gap-x-3 xxs:gap-x-4 items-start mb-3">
                    <div className="relative mt-[7px]">
                        <input
                            type="checkbox"
                            id="billingAddress"
                            className="peer appearance-none border border-blue-gray-200 w-[18px] h-[18px] rounded align-middle block checked:bg-main bg-white checked:border-main cursor-pointer"
                            defaultChecked
                            {...register("terms")}
                        />
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-px pointer-events-none opacity-0 invisible peer-checked:opacity-100 peer-checked:visible">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </span>
                    </div>
                    <div className="text-left">
                        <label htmlFor="billingAddress" className="text-[15px] text-c-novel cursor-pointer select-none">
                            By creating the account you are accepting our <Link href="/terms-and-condition" className="text-[#4493f8]">Terms & Condition</Link> and <Link href="/webinuxs-payment-policy" className="text-[#4493f8]">Our Payment Policy</Link>
                        </label>
                    </div>
                </div>
                <div className="mt-8">
                    <button type="submit" className={`w-full bg-main py-3 font-semibold text-base rounded-md relative ${watch().terms ? "" : "opacity-50"}`} disabled={isPending || !watch().terms}>
                        <span className={`${isPending && "opacity-20"}`}>Create Account</span>
                        {isPending &&
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Loading size={25} />
                            </div>
                        }
                    </button>
                </div>
            </form>
            <div className="select-none text-center mt-4 text-[15px] text-secondary">
                Already have an Webinuxs Account? <Link href="/account/login" className="text-main">Login here</Link>
            </div>
        </div>
    );
};

export default Form;