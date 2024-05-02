"use client"

import { ReactNode } from "react";

//Interface
interface ButtonProps {
    children: ReactNode;
    onClick: () => void;
    open: boolean;
}

const CollapseButton = ({ onClick, children, open }: ButtonProps) => {
    return (
        <button onClick={onClick} className="w-full text-left font-semibold text-base py-2 px-4 flex items-center">
            <span className="flex-1">{children}</span>
            <div className={`transition-all overflow-hidden duration-200 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${open ? "rotate-180 text-main" : "rotate-0"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="m112 184l144 144l144-144" /></svg>
            </div>
        </button >
    );
};

export default CollapseButton;