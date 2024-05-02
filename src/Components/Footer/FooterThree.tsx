import Link from "next/link";

//Data
const Data = [
    { path: "/my-account", Name: "Your Account" },
    { path: "/my-order", Name: "Your Order" },
    { path: "/terms-and-condition", Name: "Terms & Conditions" },
    { path: "/privacy-policy", Name: "Privacy Policy" },
    { path: "/return-and-refund-policy", Name: "Return & Refund Policy" },
]

const FooterThree = () => {
    return (
        <div className="mt-20">
            <h4 className="text-xl font-medium mb-3">Help & Legal</h4>
            <ul>
                {Data.map((item, i) => (
                    <li className="my-1" key={i}>
                        <Link href={item.path} className="hover:opacity-80">
                            {item.Name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FooterThree;