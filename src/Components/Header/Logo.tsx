import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <div>
            <Link href="/">
                <Image src="/logo-main.png" alt="Webinuxs" width={700} height={700} className="w-[90px] -mt-5" />
            </Link>
        </div>
    );
};

export default Logo;