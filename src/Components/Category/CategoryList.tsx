import Image from "next/image";
import Link from "next/link";

//Tenstack
import { Tables } from "@/Tenstack/Types/database.types";

//Interface
interface Props {
    data: Tables<"category">[];
}

const CategoryList = ({ data }: Props) => {
    return (
        <div>
            <h4 className="text-xl mb-12 font-semibold">Category <span className="text-main">List</span></h4>
            <div className="grid grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 lsm:grid-cols-3 xxs:grid-cols-2 gap-6">
                {data.map((item, i) => (
                    <Link href={`/service?category=${item.slug}`} key={i} className="bg-main/5 px-4 py-12 3xl:py-12 2xl:py-7 xl:py-6 sm:py-10 xxs:py-5 text-center rounded-md block">
                        <Image src={item.image} alt={item.slug} width={400} height={400} className="w-[130px] 2xl:w-[130px] sm:w-[80px] xxs:w-[60px] mx-auto" />
                        <p className="mt-4">{item.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;