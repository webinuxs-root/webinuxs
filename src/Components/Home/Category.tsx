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
                    <div className="mb-14">
                        <h4 className="text-3xl font-semibold text-main">Categories</h4>
                        <p className="text-primary text-base mt-1.5">Let&apos;s dive what you required most.</p>
                    </div>
                    <div>
                        <div className="grid grid-cols-6 gap-4">
                            {data?.map((item, i) => (
                                <Link href={`/service?category=${item.slug}`} className="block bg-secondary py-7 group rounded-md" key={i}>
                                    <Image src={item.image} alt={item.slug} width={400} height={400} className="w-[85px] mx-auto" />
                                    <p className="mt-3 text-lg font-medium text-center text-gray-800 group-hover:text-main">{item.name}</p>
                                </Link>
                            ))}
                        </div>
                        <Link href={"/categoris"} className="block underline w-max ml-auto mt-1.5 hover:text-main">
                            See More
                        </Link>
                    </div>
                </Container>
            </section>
        </TenstackWrapper>
    );
};

export default Category;