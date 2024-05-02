"use client"
import { ReactNode } from "react";

//Interface
interface ContainerProps {
    children: ReactNode;
}

const CollapseContainer = ({ children }: ContainerProps) => {
    return (
        <div className="bg-neutral-50 my-2 rounded-md overflow-hidden">
            {children}
        </div>
    );
};

export default CollapseContainer;