"use client"
import { useState } from "react";

//UI
import { Collapse, CollapseButton, CollapseContainer } from "@/Components/Ui";

//Data
const faqData = [
    {
        title: "What sets your web development services apart from others?",
        content: "Our web development services stand out due to our expertise in cutting-edge technologies, dedication to user-centric design, and a track record of delivering innovative solutions that drive results."
    },
    {
        title: "Can you provide examples of projects you've worked on?",
        content: "Certainly! Our payment policy is zero payment, you can order without any payment and we showcase our diverse range of web development and design work. If you like our services, we will confirmed your order."
    },
    {
        title: "How do you determine the right technology stack for a project?",
        content: "We carefully assess project requirements, scalability, and performance needs to choose the most suitable technologies from our toolkit, which includes TypeScript, JavaScript, Node.js, React.js, Next.js, Nest.js, Express.js, and GraphQL."
    },
    {
        title: "What is the typical timeline for a web development project?",
        content: "Project timelines can vary, but we provide estimated timelines during the project planning phase. Factors such as project complexity, features, and client feedback influence the schedule."
    },
    {
        title: "How do you ensure the security of web applications you develop?",
        content: "Security is a top priority. We follow industry best practices, perform security audits, and regularly update software to protect your web applications from potential threats."
    },
    {
        title: "Can you help with website maintenance and updates after the project is completed?",
        content: "Absolutely! We offer ongoing support, maintenance, and updates to keep your web application running smoothly and up to date."
    }
];


const Left = () => {
    //State
    const [open, setOpen] = useState<number | null>(null);

    //Handler
    const onOpenHandler = (i: number) => {
        if (open === i) {
            setOpen(null)
        } else {
            setOpen(i)
        }
    }

    return (
        <div>
            {faqData.slice(0, 6).map((item, i) => (
                <CollapseContainer key={i}>
                    <CollapseButton onClick={() => onOpenHandler(i)} open={open === i}>
                        {item.title}
                    </CollapseButton>
                    <Collapse
                        open={open === i}
                    >
                        {item.content}
                    </Collapse>
                </CollapseContainer>
            ))}
        </div>
    );
};

export default Left;