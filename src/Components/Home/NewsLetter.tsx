"use client"
import { BsSendFill } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

//UI
import { Container, Loading } from "../Ui";

//Tenstack & Supabase
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { ADD_EMAIL_SUBSCRIBER } from "@/Tenstack/Functions/Home/subcriber";
import { EmailInputs } from "@/Tenstack/Types/Home/subscriber";

const NewsLetter = () => {
    //Initializing Form
    const {
        register,
        handleSubmit,
        reset
    } = useForm<EmailInputs>();

    //Client
    const supabase = createClient();

    //Tenstack
    const { mutate, isPending } = useMutation({
        mutationKey: ["addEmail"],
        mutationFn: (formData: EmailInputs) => ADD_EMAIL_SUBSCRIBER(supabase, formData),
        onSuccess: () => {
            toast.success("Thanks for subscribing us.")
            reset()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    //Handler
    const onSubmit: SubmitHandler<EmailInputs> = (value) => {
        mutate(value)
    }

    return (
        <section className="pt-12 pb-20">
            <Container>
                <div className="grid grid-cols-2 gap-5 bg-[url('/news-letter.png')] bg-center bg-no-repeat bg-cover px-12 py-28 rounded-lg">
                    <div>
                        <h4 className="text-5xl font-semibold">Stay home & get your <br />needs from <span className="text-main">our shop</span></h4>
                        <p className="text-lg mt-6">Save up to 50%  off on your first order</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex mt-12 relative">
                                <input
                                    placeholder="Your email address"
                                    className="pl-14 pr-5 py-4 w-[500px] bg-white border peer border-solid border-gray-100 rounded-s-md placeholder:text-primary outline-none focus:border-main"
                                    required={true}
                                    {...register("email", { required: true })}
                                />
                                <span className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-700 peer-focus:text-main">
                                    <BsSendFill className="text-xl" />
                                </span>
                                <button className="bg-primary px-4 text-gray-100 rounded-e-md relative" type="submit" disabled={isPending}>
                                    <span className={`${isPending && "opacity-20"}`}>Subscribe</span>
                                    {isPending &&
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                            <Loading size={25} />
                                        </div>
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default NewsLetter;