//UI
import { Container } from "../Ui";

const TopContent = () => {
    return (
        <Container className="py-16">
            <div className="text-left mb-16">
                <h4 className="text-4xl font-bold text-primary mb-2">About <span className="text-main">Us</span></h4>
                <p className="text-sm">Let’s get your booking Started</p>
            </div>
            <h4 className="text-lg 4xl:text-xl mb-6 font-bold">We make your special day <span className="text-main">Memorable.</span></h4>
            <div className="grid grid-cols-2 lg:grid-cols-2 xxs:grid-cols-1 gap-9">
                <div>
                    <p className="text-gray-600 text-base">
                        Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution for all your technical and managerial hurdles when developing a Mobile or Web Application. We will Plan, Design, Develop, Test and Deploy your idea using your desired or our recommended technology stack while making sure you get the Quality Product without Outspending your budget. <br /><br />
                        Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution for all your technical and managerial hurdles when developing a Mobile or Web Application
                    </p>
                </div>
                <div>
                    <p className="text-c-novel text-base">
                        Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution for all your technical and managerial hurdles when developing a Mobile or Web Application. We will Plan, Design, Develop, Test and Deploy your idea using your desired or our recommended technology stack while making sure you get the Quality Product without Outspending your budget, g your desired or our recommended technology stack while making sure you get the Quality Product without Outspending your budget
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default TopContent;