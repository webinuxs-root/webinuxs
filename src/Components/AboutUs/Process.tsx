import { FaBell } from "react-icons/fa";
import { CgDollar } from "react-icons/cg";

//UI
import { Container } from "../Ui";


//Data
const data = [
    {
        name: "Planning & Execution",
        description: "Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution.",
        icon: <FaBell />
    },
    {
        name: "Planning & Execution",
        description: "Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution.",
        icon: <CgDollar />
    },
    {
        name: "Planning & Execution",
        description: "Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution.",
        icon: <FaBell />
    },
    {
        name: "Planning & Execution",
        description: "Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution.",
        icon: <CgDollar />
    }
]

const Process = () => {
    return (
        <Container className="py-12">
            <div className="text-center mb-16">
                <h4 className="text-4xl font-bold text-black">Our <span className="text-main">Process</span></h4>
                <p className="text-sm text-gray-600 w-[40%] md:w-[40%] msm:w-[60%] xxs:w-[90%] mx-auto mt-4">We can pretty much tackle anything you can throw at us.</p>
            </div>
            <div className="w-[55%] lg:w-[55%] md:w-[80%] xxs:w-[100%] mx-auto">
                <ol className="relative border-s border-main/20">
                    {data.map((item, i) => (
                        <li className="mb-10 ms-6" key={i}>
                            <span className="absolute flex items-center justify-center w-7 h-7 rounded-full -start-[14px] bg-main text-white">
                                {item.icon}
                            </span>
                            <h3 className="mb-1 text-lg font-semibold">{item.name}</h3>
                            <p className="text-base font-normal text-gray-500">{item.description}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </Container>
    );
};

export default Process;