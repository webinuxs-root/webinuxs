"use client"

import { useState } from "react";

//UI
import { Collapse, CollapseButton, CollapseContainer } from "@/Components/Ui";

//Data
const faqData = [
    {
        title: "What is your approach to user experience (UX) and user interface (UI) design?",
        content: "We prioritize user-centric design, ensuring that every element of your web application is optimized for an intuitive and engaging user experience."
    },
    {
        title: "Do you offer SEO optimization services?",
        content: "Yes, we provide SEO optimization to enhance your website's visibility and ranking on search engines, driving organic traffic."
    },
    {
        title: "What is the process for collaborating on a project?",
        content: "We begin with a consultation to understand your needs, followed by project planning, development, testing, and deployment. We maintain clear communication throughout the process."
    },
    {
        title: "How do you handle scalability for web applications?",
        content: "We design applications with scalability in mind, allowing them to grow seamlessly with your business. We leverage cloud services and efficient coding practices for scalability."
    },
    {
        title: "What is your pricing structure for web development projects?",
        content: "Our pricing is tailored to the specific project scope and requirements. We provide transparent pricing details during the initial consultation."
    },
    {
        title: "How can I get in touch with your team to discuss a project?",
        content: "You can easily reach us through the what'sapp, other communication platform like facebook and linkedIn, by phone, or by email. We're always eager to hear about your projects and ideas!"
    }
]


const Right = () => {
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

export default Right;