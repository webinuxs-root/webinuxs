import Image from "next/image";
import Link from "next/link";

//UI
import { Container } from "../Ui";

//Tenstack & Supabase
import TenstackWrapper from "@/Tenstack/TenstackWrapper";
import { createClient } from "@/Supabase/server";
import { QueryClient } from "@tanstack/react-query";
import { GET_CATEGORY_HOMES } from "@/Tenstack/Functions/Home/category";

const Category = async () => {
    //Client
    const supabase = createClient();
    const queryClient = new QueryClient();

    //Query
    const data = await queryClient.fetchQuery({
        queryKey: ["categoryListHome"],
        queryFn: () => GET_CATEGORY_HOMES(supabase)
    })

    return (
        <TenstackWrapper client={queryClient}>
            <section className="py-14">
                <Container>
                    <div className="flex mb-14 gap-2 items-end">
                        <div className="flex-1">
                            <h4 className="text-3xl sm:text-3xl xxs:text-2xl font-semibold text-main">Categories</h4>
                            <p className="text-primary text-base mt-1.5">Let&apos;s dive what you required most.</p>
                        </div>
                        <Link href={"/category"} className="block underline w-max ml-auto hover:text-main">
                            See More
                        </Link>
                    </div>
                    <div>
                        <div className="grid grid-cols-6 xl:grid-cols-6 lg:grid-cols-4 lsm:grid-cols-3 xxs:grid-cols-2 gap-4">
                            {data?.map((item, i) => (
                                <Link href={`/service?category=${item.slug}`} className="block bg-secondary 4xl:py-10 2xl:py-7 xl:py-6 py-7 group rounded-md px-6" key={i}>
                                    <Image src={item.image} alt={item.slug} width={400} height={400} className="w-[85px] sm:w-[85px] xxs:w-[65px] mx-auto" />
                                    <p className="mt-3 text-lg sm:text-lg xxs:text-base font-medium text-center text-gray-800 break-words group-hover:text-main">{item.name}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>
        </TenstackWrapper>
    );
};

export default Category;