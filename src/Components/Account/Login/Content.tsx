import { FaRegCheckCircle } from "react-icons/fa";

const Content = () => {
    return (
        <div className="bg-main/5 rounded-s-md px-10 py-12">
            <h4 className="text-3xl font-medium mb-2">Login to Your Account</h4>
            <p className="text-base text-gray-700 mb-4">
                Choose from our boundless possibilities with a single click. Elevate your next web application experience by placing your order effortlessly. We are using zero payment policy for ordering our services.
            </p>
            <h5 className="text-xl font-medium mb-4">Just getting started?</h5>
            <ul className="[&_li]:flex [&_li]:items-center [&_li]:gap-2 [&_li]:mb-1.5">
                <li>
                    <FaRegCheckCircle />
                    <span>Choose your use case.</span>
                </li>
                <li>
                    <FaRegCheckCircle />
                    <span>Place your order.</span>
                </li>
                <li>
                    <FaRegCheckCircle />
                    <span>See demo and confirmed order.</span>
                </li>
            </ul>
        </div>
    );
};

export default Content;