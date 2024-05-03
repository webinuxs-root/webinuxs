import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { IoMail } from "react-icons/io5";

const FooterOne = () => {
    return (
        <div>
            <Image src="/logo-2.png" width={500} height={331.23} alt="Logo" className="w-[180px]" />
            <p className="text-base mt-4 opacity-95">We&apos;re top choice for custom web application. Our wide range of options suits any industry for building interactive web application.</p>
            <ul className="mt-4 [&_li_a]:flex [&_li_a]:gap-3 [&_li]:my-1 [&_li_a]:items-center">
                <li>
                    <Link href="tel:+8801521744654">
                        <FaPhoneAlt />
                        <span>+88 01521 744 654</span>
                    </Link>
                </li>
                <li>
                    <Link href="https://api.whatsapp.com/message/UAXIYNES562EN1">
                        <RiWhatsappFill />
                        <span>+88 01611 994 403</span>
                    </Link>
                </li>
                <li>
                    <Link href="mailto:info@webinuxs.com">
                        <IoMail />
                        <span>info@webinuxs.com</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default FooterOne;