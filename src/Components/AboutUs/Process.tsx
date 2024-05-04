import { CgDollar } from "react-icons/cg";
import { SiGooglemeet } from "react-icons/si";
import { GiConfirmed } from "react-icons/gi";

//UI
import { Container } from "../Ui";

//Data
const data = [
    {
        name: "Purchase a Services with Zero Payment.",
        description: "You can purchase any service without paying any payment. Select a service and proceed to checkout without any payment.",
        icon: <CgDollar />
    },
    {
        name: "Get Demos and details in live meeting.",
        description: "We will contact to you by your given contact information for showing the service demo in live google meeting before further process.",
        icon: <SiGooglemeet className="text-[13px]" />
    },
    {
        name: "Confirm the Purchase by Paying Payment.",
        description: "If you like our services and can trust ourselves, then we ask you for payment settlement and confirm the order. We will process the further work.",
        icon: <GiConfirmed />
    }
]

const Process = () => {
    return (
        <Container className="py-12">
            <div className="text-center mb-16">
                <h4 className="text-4xl font-bold text-black">Our <span className="text-main">Process</span></h4>
                <p className="text-sm text-gray-600 w-[40%] md:w-[40%] msm:w-[60%] xxs:w-[90%] mx-auto mt-4">We believe in 3 steps purchase from our website.</p>
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