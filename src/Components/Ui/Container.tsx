import { ReactNode } from "react";

//Interface
interface Props {
    children?: ReactNode;
    className?: string;
}

const Container = ({ children, className = "" }: Props) => {
    return (
        <div className={`4xl:container 4xl:mx-auto px-10 xl:px-10 msm:px-5 xxs:px-4 ${className}`}>
            {children}
        </div>
    );
};

export default Container;