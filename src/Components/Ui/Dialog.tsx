"use client"
import { ReactNode, useRef } from "react";
import { m, AnimatePresence, domAnimation, LazyMotion } from "framer-motion";
import { FloatingPortal, FloatingOverlay } from "@floating-ui/react";

//Helpers
import { useClickOutside } from ".";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    width?: number;
    height?: number;
    className?: string;
    mainClassName?: string;
}

const Dialog = ({ open, onClose, children, width, height, className, mainClassName }: Props) => {
    const animation = {
        unmount: {
            opacity: 0,
            y: -15,
            transition: {
                duration: 0.2,
            },
        },
        mount: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.2,
            },
        },
    };
    const backdropAnimation = {
        unmount: {
            opacity: 0,
            transition: {
                delay: 0.1,
            },
        },
        mount: {
            opacity: 1,
        },
    };

    const ref = useRef<HTMLDivElement>(null);


    useClickOutside(ref, onClose);


    return (
        <LazyMotion features={domAnimation}>
            <FloatingPortal>
                <AnimatePresence>
                    {open && (
                        <FloatingOverlay
                            style={{
                                zIndex: 9999
                            }}
                            lockScroll
                        >
                            <m.div
                                className={`bg-black/55 fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-sm ${mainClassName}`}
                                initial="unmount"
                                exit="unmount"
                                animate={open ? "mount" : "unmount"}
                                variants={backdropAnimation}
                                transition={{ duration: 0.2 }}
                            >
                                <m.div
                                    className={`bg-white rounded-md p-4 ${className}`}
                                    initial="unmount"
                                    exit="unmount"
                                    animate={open ? "mount" : "unmount"}
                                    variants={animation}
                                    style={{ width: width + "px", height: height + "px" }}
                                    ref={ref}
                                >
                                    {children}
                                </m.div>
                            </m.div>
                        </FloatingOverlay>
                    )}
                </AnimatePresence>
            </FloatingPortal>
        </LazyMotion>
    );
};

export default Dialog;