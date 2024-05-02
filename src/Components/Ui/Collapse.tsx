"use client"

import { ReactNode, useRef } from "react";

//Interface
interface Props {
    children: ReactNode;
    open: boolean;
}

const Collapse = ({ children, open }: Props) => {
    //Hook Initializing
    const contentRef = useRef<HTMLDivElement | null>(null);

    //Handler
    const getHeight = () => {
        const height = contentRef.current?.scrollHeight + "px";
        return height
    }

    return (
        <p className={`transition-[height] overflow-hidden duration-200 ease-[cubic-bezier(0.4, 0, 0.2, 1)]`} style={{ height: open ? getHeight() : 0 }} ref={contentRef}>
            <span className="py-5 px-4 block border-t border-solid border-gray-200">
                {children}
            </span>
        </p>
    );
};

export default Collapse;