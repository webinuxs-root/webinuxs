import { FaCopyright } from "react-icons/fa";
import moment from "moment";

//UI
import { Container } from "../Ui";

const Copyright = () => {
    return (
        <footer className="bg-[#232836] pt-6 pb-6 lg:pb-6 sm:pb-24 xxs:pb-[85px] lg:pt-6 sm:pt-10 xxs:pt-6">
            <Container className="text-center">
                <p className="text-secondary flex items-center justify-center gap-2">
                    <FaCopyright className="xxs:max-sm:hidden" />
                    <span>{moment().format("YYYY")} Webinuxs Pty Ltd. All rights reserved.</span>
                </p>
            </Container>
        </footer>
    );
};

export default Copyright;