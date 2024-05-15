"use client"
import { ReactNode, Fragment, forwardRef } from "react";
import { m, AnimatePresence, domAnimation, LazyMotion, useAnimation } from "framer-motion";
import { useFloating, useInteractions, useDismiss } from "@floating-ui/react";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
    children?: ReactNode;
    placement?: "left" | "right"
    size?: number;
    className?: string;
}

const Drawer = forwardRef<HTMLDivElement, Props>(({ open, onClose, children, placement = "left", size = 300, className }, ref) => {
    //Backdrop Animation
    const backdropAnimation = {
        unmount: {
            opacity: 0,
            transition: {
                delay: 0.3,
            },
        },
        mount: {
            opacity: 1,
        },
    };

    //Drawer Animation
    const drawerAnimation = {
        open: {
            x: 0
        },
        close: {
            x: -size
        }
    };

    //Hooks
    const { context } = useFloating({
        open,
        onOpenChange: onClose,
    });
    const { getFloatingProps } = useInteractions([useDismiss(context, undefined)]);

    return (
        <Fragment>
            <LazyMotion features={domAnimation}>
                <AnimatePresence>
                    {open && (
                        <m.div
                            initial="unmount"
                            exit="unmount"
                            animate={open ? "mount" : "unmount"}
                            variants={backdropAnimation}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 w-full h-full pointer-events-auto z-[99999] bg-black/60 backdrop-blur-sm top-0 left-0"
                        />
                    )}
                </AnimatePresence>
                <m.div
                    {...getFloatingProps({
                        ref,
                    })}
                    style={{
                        maxWidth: placement === "left" || placement === "right" ? size : "100%"
                    }}
                    className={`fixed z-[9999999] left-0 bg-white box-border shadow-5xl h-screen top-0 w-full ${className}`}
                    initial="close"
                    animate={open ? "open" : "close"}
                    variants={drawerAnimation}
                    transition={{
                        type: "tween",
                        duration: 0.2
                    }}
                >
                    {children}
                </m.div>
            </LazyMotion>
        </Fragment>
    );
});

export default Drawer;