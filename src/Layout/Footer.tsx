import { Fragment } from "react";

//Components
import FooterOne from "@/Components/Footer/FooterOne";
import FooterTwo from "@/Components/Footer/FooterTwo";
import FooterThree from "@/Components/Footer/FooterThree";
import FooterFour from "@/Components/Footer/FooterFour";
import Copyright from "@/Components/Footer/Copyright";
import FooterNav from "@/Components/Footer/FooterNav";

//UI
import { Container } from "@/Components/Ui";

const Footer = () => {
    return (
        <Fragment>
            <footer className="bg-primary text-secondary pt-7 pb-12">
                <FooterNav />
                <Container>
                    <div className="grid grid-cols-4 lg:grid-cols-4 xxs:grid-cols-1 gap-9 lg:gap-9 xxs:gap-0">
                        <FooterOne />
                        <FooterTwo />
                        <FooterThree />
                        <FooterFour />
                    </div>
                </Container>
            </footer>
            <Copyright />
        </Fragment>
    );
};

export default Footer;