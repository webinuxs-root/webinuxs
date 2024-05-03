"use client"
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { RiErrorWarningFill } from "react-icons/ri";
import toast from "react-hot-toast";

//UI
import { ProfileImage, Loading } from "@/Components/Ui";

//Tenstack & Supabase
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { GET_PROFILE, UPDATE_PROFILE } from "@/Tenstack/Functions/Account/profile";
import { ProfileInput } from "@/Tenstack/Types/Account/profile";

//Interface
interface Inputs {
    first_name: string;
    last_name: string;
    phone: string;
    country: string;
    state: string;
    image: string;
}

const ProfileSettings = () => {
    //Client
    const supabase = createClient();

    //Initializing Hook
    const queryClient = useQueryClient();

    //Tenstack
    const { data } = useQuery({
        queryKey: ["profile"],
        queryFn: () => GET_PROFILE(supabase)
    })
    const { isPending, mutate } = useMutation({
        mutationKey: ["updateProfile"],
        mutationFn: (formData: ProfileInput) => UPDATE_PROFILE(supabase, formData),
        onSuccess: () => {
            toast.success("Your profile updated successfully.")
            queryClient.invalidateQueries({ queryKey: ["profile"] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    //Initializing Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm<Inputs>({
        defaultValues: {
            first_name: data?.user?.user_metadata.first_name,
            last_name: data?.user?.user_metadata.last_name,
            phone: data?.user?.user_metadata.phone,
            country: data?.user?.user_metadata.country,
            state: data?.user?.user_metadata.state,
            image: data?.user?.user_metadata.image
        }
    });

    //Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate(value)
    }

    return (
        <div>
            <div className="mb-6">
                <h4 className="text-2xl font-semibold">Update Your <span className="text-main">Profile</span></h4>
                <p className="text-[15px] mt-1 text-gray-600">Update your profile from here. Please fill the form.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="firstName" className="block mb-1.5 text-base text-primary">First Name</label>
                        <input
                            className="border border-solid border-gray-200 w-full px-4 py-2.5 rounded text-[15px] focus:outline-main"
                            placeholder="Type your first name"
                            id="firstName"
                            {...register("first_name", {
                                required: "Please type your first name."
                            })}
                        />
                        {errors.first_name &&
                            <p className="flex items-center mt-1.5 gap-1 text-[15px] text-main">
                                <RiErrorWarningFill />
                                <span>{errors.first_name.message}</span>
                            </p>
                        }
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block mb-1.5 text-base text-primary">Last Name</label>
                        <input
                            className="border border-solid border-gray-200 w-full px-4 py-2.5 rounded text-[15px] focus:outline-main"
                            placeholder="Type your last name"
                            id="lastName"
                            {...register("last_name", {
                                required: "Please type your last name."
                            })}
                        />
                        {errors.last_name &&
                            <p className="flex items-center mt-1.5 gap-1 text-[15px] text-main">
                                <RiErrorWarningFill />
                                <span>{errors.last_name.message}</span>
                            </p>
                        }
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="phone" className="block mb-1.5 text-base text-primary">Phone number</label>
                        <input
                            className="border border-solid border-gray-200 w-full px-4 py-2.5 rounded text-[15px] focus:outline-main"
                            placeholder="Type your phone"
                            id="phone"
                            {...register("phone", {
                                required: "Please type your phone number."
                            })}
                        />
                        {errors.phone &&
                            <p className="flex items-center mt-1.5 gap-1 text-[15px] text-main">
                                <RiErrorWarningFill />
                                <span>{errors.phone.message}</span>
                            </p>
                        }
                    </div>
                    <div>
                        <label htmlFor="country" className="block mb-1.5 text-base text-primary">Country</label>
                        <input
                            className="border border-solid border-gray-200 w-full px-4 py-2.5 rounded text-[15px] focus:outline-main"
                            placeholder="Type your country"
                            id="country"
                            {...register("country", {
                                required: "Please type your country name."
                            })}
                        />
                        {errors.country &&
                            <p className="flex items-center mt-1.5 gap-1 text-[15px] text-main">
                                <RiErrorWarningFill />
                                <span>{errors.country.message}</span>
                            </p>
                        }
                    </div>
                    <div>
                        <label htmlFor="state" className="block mb-1.5 text-base text-primary">State</label>
                        <input
                            className="border border-solid border-gray-200 w-full px-4 py-2.5 rounded text-[15px] focus:outline-main"
                            placeholder="Type your country"
                            id="state"
                            {...register("state", {
                                required: "Please type your state name."
                            })}
                        />
                        {errors.state &&
                            <p className="flex items-center mt-1.5 gap-1 text-[15px] text-main">
                                <RiErrorWarningFill />
                                <span>{errors.state.message}</span>
                            </p>
                        }
                    </div>
                </div>
                <div className="mt-12">
                    <h4 className="text-2xl font-semibold">Upload Profile <span className="text-main">Picture</span></h4>
                    <p className="text-[15px] mt-1 text-gray-600">Please upload a profile picture.</p>
                </div>
                <Controller
                    control={control}
                    name="image"
                    render={({ field: { onChange, value } }) => (
                        <ProfileImage
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
                <div className="mt-14">
                    <button type="submit" className="bg-main px-5 py-2 rounded text-white font-semibold relative" disabled={isPending}>
                        <span className={`${isPending && "opacity-20"}`}>Update Profile</span>
                        {isPending &&
                            <div className="absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Loading />
                            </div>
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileSettings;