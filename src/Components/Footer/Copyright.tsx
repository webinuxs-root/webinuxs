import { FaCopyright } from "react-icons/fa";
import moment from "moment";

//UI
import { Container } from "../Ui";

const Copyright = () => {
    return (
        <footer className="bg-[#232836] py-6">
            <Container className="text-center">
                <p className="text-secondary flex items-center justify-center gap-2">
                    <FaCopyright />
                    <span>{moment().format("YYYY")} Webinuxs Pty Ltd. All rights reserved.</span>
                </p>
            </Container>
        </footer>
    );
};

export default Copyright;