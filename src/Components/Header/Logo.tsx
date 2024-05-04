import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <div>
            <Link href="/" className="relative">
                <Image src="/logo-main.png" alt="Webinuxs" width={700} height={700} className="w-[90px] -mt-5" />
                <p className="text-xs bg-primary absolute top-0 right-0 px-1 py-px rounded-sm text-white">Beta</p>
            </Link>
        </div>
    );
};

export default Logo;