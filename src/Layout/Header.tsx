//Components
import Logo from "@/Components/Header/Logo";
import Navs from "@/Components/Header/Navs";
import Rest from "@/Components/Header/Rest";

//UI
import { Container } from "@/Components/Ui";

const Header = () => {
    return (
        <header className="top-0 fixed w-full z-50">
            <Container className="flex gap-5 items-center py-6">
                <Logo />
                <Navs />
                <Rest />
            </Container>
        </header>
    );
};

export default Header;