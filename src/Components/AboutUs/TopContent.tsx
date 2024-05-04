//UI
import { Container } from "../Ui";

const TopContent = () => {
    return (
        <Container className="py-16">
            <div className="text-left mb-16">
                <h4 className="text-4xl font-bold text-primary mb-2">About <span className="text-main">Us</span></h4>
                <p className="text-sm">Your web development agency.</p>
            </div>
            <h4 className="text-lg 4xl:text-xl mb-6 font-bold">We make your next  <span className="text-main">Web application.</span></h4>
            <div className="grid grid-cols-2 lg:grid-cols-2 xxs:grid-cols-1 gap-9">
                <div>
                    <p className="text-gray-600 text-base">
                        Are you looking for a trustworthy, dedicated and experience web developers for your next project? Look no further! With over 6 years of experience and a track record or completing 70 projects for satisfied clients, we bring a wealth of expertise to your web application development needs.<br /><br />
                        Why choose us? <br />
                        We thrive on challenges, whether it's enhancing performance, improving user interfaces, or optimizing database structures. As a senior web developers, we have a proven track record of delivering top-notch results within deadlines, ensuring client satisfaction.
                    </p>
                </div>
                <div>
                    <p className="text-c-novel text-base">
                        Our skills encompass a wide range of technologies, including Nodejs, Nextjs, Reactjs, Nestjs, Expressjs, GraphQL, MongoDB, PostgreSQL, Python, JavaScript, TypeScript, AWS EC2, Tailwind CSS, Material UI, and Apollo Server. I'm passionate about exploring cutting-edge web technologies and using them to create high-quality, user-friendly web applications that stand out. By hiring us, you'll benefit from a seasoned professional who combines technical prowess with creativity. we're dedicated to tailoring solutions that align with your vision and objectives, ensuring your web project exceeds expectations.
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default TopContent;