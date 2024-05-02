import { FaRegCheckCircle } from "react-icons/fa";

const Content = () => {
    return (
        <div className="bg-main/5 rounded-s-md px-10 py-12">
            <h4 className="text-3xl font-medium mb-2">Create Your Account</h4>
            <p className="text-base text-gray-700 mb-4">
                Whether you&apos;re evaluating GraphQL or ready to consolidate your GraphQL APIs into a single platform, our team can help.
            </p>
            <h5 className="text-xl font-medium mb-4">Just getting started?</h5>
            <ul className="[&_li]:flex [&_li]:items-center [&_li]:gap-2 [&_li]:mb-1.5">
                <li>
                    <FaRegCheckCircle />
                    <span>Discuss your use case</span>
                </li>
                <li>
                    <FaRegCheckCircle />
                    <span>Schedule a demo</span>
                </li>
                <li>
                    <FaRegCheckCircle />
                    <span>Understand our plans</span>
                </li>
            </ul>
        </div>
    );
};

export default Content;