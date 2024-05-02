"use client"
import { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";
import toast from "react-hot-toast";

//UI
import Loading from "./Loading";

//Tenstack & Supabase
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/Supabase/client";
import { UPLOAD_PROFILE_IMAGE } from "@/Tenstack/Functions/Account/profile";

//Interface
interface Props {
    onChange: (e: string) => void;
    value: string;
}

const ProfileImage = ({ onChange, value }: Props) => {
    //State
    const [images, setImages] = useState<ImageListType>([]);

    //Client
    const supabase = createClient();

    //Tenstack
    const { isPending, mutate } = useMutation({
        mutationKey: ["profileImage"],
        mutationFn: (file: File) => UPLOAD_PROFILE_IMAGE(supabase, file),
        onSuccess: (data) => {
            onChange(`https://cyrnpvpvbplydbhvaleu.supabase.co/storage/v1/object/public/webinars/${data.path}`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    //Handler
    const onImageChange = (images: ImageListType) => {
        setImages(images)
        mutate(images[0].file as File)
    }

    return (
        <div>
            <ImageUploading
                value={images}
                onChange={onImageChange}
                dataURLKey="wbx"
                resolutionWidth={800}
                resolutionHeight={800}
                resolutionType="ratio"
            >
                {({
                    imageList,
                    onImageUpload,
                    isDragging,
                    dragProps,
                    errors
                }) => (
                    <div className="mt-10">
                        {imageList.length === 0 && !value &&
                            <div className={`border border-dashed w-[200px] h-[200px] rounded-full flex items-center justify-center cursor-pointer overflow-hidden relative select-none ${isDragging ? "border-green-600" : "border-main"}`} {...dragProps} onClick={onImageUpload}>
                                <div>
                                    <p>Drag & Drop <br />
                                        <span className={`${isDragging ? "text-green-600" : "text-main"}`}> Image Here</span>
                                    </p>
                                </div>
                                {isPending &&
                                    <div className="absolute top-0 left-0 bg-black/40 w-full h-full flex items-center z-20 justify-center">
                                        <Loading size={40} color="white" />
                                    </div>
                                }
                            </div>
                        }
                        {imageList.length > 0 &&
                            <div>
                                {imageList.map((item, i) => (
                                    <div key={i} className={`w-[200px] h-[200px] . rounded-full p-1 border relative border-dashed overflow-hidden select-none cursor-pointer ${isDragging ? "border-green-600" : "border-main"}`} {...dragProps} onClick={onImageUpload}>
                                        <Image src={item["wbx"]} alt="Profile Image" width={400} height={400} />
                                        {isPending &&
                                            <div className="absolute top-0 left-0 bg-black/40 w-full h-full flex items-center z-20 justify-center">
                                                <Loading size={40} color="white" />
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                        }
                        {imageList.length === 0 && value &&
                            <div className={`w-[200px] h-[200px] . rounded-full p-1 border border-dashed overflow-hidden select-none cursor-pointer relative ${isDragging ? "border-green-600" : "border-main"}`} {...dragProps} onClick={onImageUpload}>
                                <Image src={value} alt="Profile Image" width={400} height={400} />
                                {isPending &&
                                    <div className="absolute top-0 left-0 bg-black/40 w-full h-full flex items-center z-20 justify-center">
                                        <Loading size={40} color="white" />
                                    </div>
                                }
                            </div>
                        }
                        {errors &&
                            <div className="mt-8">
                                {errors.resolution && <p className="relative after:w-1.5 after:h-1.5 text-main text-[15px] font-medium after:bg-main after:rounded-full after:top-1/2 after:-left-3 after:absolute after:-translate-y-1/2">
                                    Selected file is not desired resolution. Please upload a square size image
                                </p>}
                            </div>
                        }
                    </div>
                )}
            </ImageUploading>
        </div>
    );
};

export default ProfileImage;