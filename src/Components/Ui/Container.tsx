import { ReactNode } from "react";

//Interface
interface Props {
    children?: ReactNode;
    className?: string;
}

const Container = ({ children, className = "" }: Props) => {
    return (
        <div className={`4xl:container 4xl:mx-auto px-10 ${className}`}>
            {children}
        </div>
    );
};

export default Container;