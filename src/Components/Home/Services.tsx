import Image from "next/image";

//UI
import { Container } from "../Ui";

const Services = () => {
    return (
        <section className="py-14">
            <Container>
                <div className="text-right">
                    <div className="flex gap-2 items-center">
                        <div className="flex-1 w-full bg-main h-1">

                        </div>
                        <h4 className="text-2xl font-bold">What We <span className="text-main">Do?</span></h4>
                    </div>
                    <p className="w-[40%] 2xl:w-[40%] xl:w-[60%] lg:w-[80%] xxs:w-full ml-auto mt-2">We harness the power of cutting-edge technologies in three major field.</p>
                </div>
                <div className="grid grid-cols-3 lg:grid-cols-3 xxs:grid-cols-1 gap-8 mt-20">
                    {data.map((item, i) => (
                        <div key={i} className="bg-neutral-50 rounded-md overflow-hidden py-5 px-6 after:w-[200px] group relative after:h-[200px] after:bg-main after:absolute after:rounded-full after:-top-20 after:-right-20 after:translate-x-[50%] after:transition-all after:duration-200 after:ease-[cubic-bezier(0.4, 0, 0.2, 1)] after:-translate-y-[50%]  hover:after:translate-x-0 hover:after:translate-y-0">
                            <Image src={item.icon} alt={item.name1} width={500} height={440} className="transition-all duration-200 ease-[cubic-bezier(0.4, 0, 0.2, 1)] w-[200px] group-hover:scale-105" />
                            <h4 className="text-xl font-bold mt-5">{item.name1} <span className="text-main">{item.name2}</span></h4>
                            <p className="text-base mt-2 opacity-90">{item.description}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Services;

const data = [
    {
        name1: "Web App",
        name2: "Development",
        description: "We specialize in creating custom web applications tailored to your unique needs and requirements.",
        icon: "/services/s-1.png"
    },
    {
        name1: "Backend",
        name2: "Development",
        description: "Our backend development services cover everything from database design to server-side logic.",
        icon: "/services/s-2.png"
    },
    {
        name1: "Deployment",
        name2: "Services",
        description: "We take care of deploying your web applications to production environments securely and efficiently.",
        icon: "/services/s-3.png"
    }
];