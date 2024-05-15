import Image from "next/image";
import moment from "moment";

//UI
import { Container, ProductCard } from "../Ui";

//Tenstack
import { Tables } from "@/Tenstack/Types/database.types";
import { QueryClient } from "@tanstack/react-query";
import TenstackWrapper from "@/Tenstack/TenstackWrapper";
import { createClient } from "@/Supabase/server";
import { GET_TREND_LIST } from "@/Tenstack/Functions/Home/trend";

const Trends = async () => {
    //Client
    const supabase = createClient();
    const queryClient = new QueryClient();

    //Query
    const data = await queryClient.fetchQuery({
        queryKey: ["trendList"],
        queryFn: () => GET_TREND_LIST(supabase)
    })

    return (
        <TenstackWrapper client={queryClient}>
            <section className="my-16">
                <Container>
                    <div className="rounded-lg overflow-hidden">
                        <div className="relative">
                            <Image src={data?.image as string} alt={data?.alt as string} width={1550} height={300} className="w-full object-cover object-center xxs:max-xl:hidden" />
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-[26%] 3xl:bottom-[26%] 2xl:bottom-[15%] xl:bottom-[10%] text-white text-center xxs:max-xl:hidden">
                                <h4 className="text-xl font-medium">End In</h4>
                                <p className="bg-white w-max px-5 font-medium mx-auto py-1.5 rounded-lg text-primary mt-1.5">{moment(data?.end_in).format("DD MMM YYYY")}</p>
                                <p className="text-xl uppercase font-medium mt-4">Starting Price <span className="text-main font-semibold">${data?.start_price}</span></p>
                            </div>
                            <div className="text-white text-center xxs:max-xl:block hidden bg-black py-8">
                                <h4 className="text-xl font-medium">End In</h4>
                                <p className="bg-white w-max px-5 font-medium mx-auto py-1.5 rounded-lg text-primary mt-1.5">{moment(data?.end_in).format("DD MMM YYYY")}</p>
                                <p className="text-xl uppercase font-medium mt-4">Starting Price <span className="text-main font-semibold">${data?.start_price}</span></p>
                            </div>
                        </div>
                        {/* Above 1536 Size Device */}
                        <div className="bg-black text-white grid grid-cols-4 gap-6 p-6 xxs:max-3xl:hidden">
                            {data?.campaign_join.map((item, i) => (
                                <ProductCard item={item.product as Tables<"product">} key={i} />
                            ))}
                        </div>
                        {/* Below 1365 Size Device */}
                        <div className="bg-black text-white grid-cols-3 lg:grid-cols-3 lsm:grid-cols-2 xxs:grid-cols-1  gap-6 p-6 sm:p-6 xxs:p-4 xxs:max-3xl:grid hidden">
                            {data?.campaign_join.slice(0, 6).map((item, i) => (
                                <ProductCard item={item.product as Tables<"product">} key={i} />
                            ))}
                        </div>
                    </div>
                </Container>
            </section>
        </TenstackWrapper>
    );
};

export default Trends;