import Link from "next/link";

//Data
const Data = [
    { path: "/", name: "Home" },
    { path: "/service", name: "Services" },
    // { path: "/micro", name: "Micro" },
    { path: "/category", name: "Categories" },
    { path: "/about-us", name: "About Us" },
]

const Navs = () => {
    return (
        <div className="flex-1 xxs:max-lg:hidden">
            <div className="flex gap-8 bg-primary h-[40px] items-center px-6 rounded-lg text-secondary w-max">
                {Data.map((item, i) => (
                    <Link href={item.path} key={i}>{item.name}</Link>
                ))}
            </div>
        </div>
    );
};

export default Navs;
