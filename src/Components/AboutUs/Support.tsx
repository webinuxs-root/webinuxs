//UI
import { Container } from "../Ui";

const data = [
    {
        name: "Professional Support",
        description: "Our dedicated team of experts is committed to providing unparalleled professional support tailored to your unique needs. From initial consultation to ongoing assistance, we're here to ensure your success every step of the way."
    },
    {
        name: "Awesome Web Application",
        description: "Elevate your online presence with our cutting-edge web application solutions. Designed for optimal performance and user experience, our applications combine innovation with functionality to deliver an awesome digital experience for your audience."
    },
    {
        name: "Planning & Execution",
        description: "Let us guide you through the intricacies of planning and executing your projects with precision and efficiency. From strategic roadmap development to meticulous implementation, our comprehensive approach ensures seamless execution and measurable results."
    }
]

const awards = [
    { number: "70", prefix: "+", title: "Successful Projects" },
    { number: "7", prefix: "+", title: "Our Teams" },
    { number: "20", prefix: "+", title: "Happy Clients" },
    { number: "6", prefix: "+", title: "Our Experience" },
]

const Support = () => {
    return (
        <Container className="my-12">
            <div className="grid grid-cols-2 lg:grid-cols-2 xxs:grid-cols-1 gap-10 py-8 items-center">
                <div>
                    {data.map((item, i) => (
                        <div className={`bg-main/5 w-[75%] md:w-[75%] xxs:w-full my-6 p-8 rounded-lg ${i % 2 !== 0 && "ml-14 md:ml-14 xxs:ml-0"}`} key={i}>
                            <h4 className="text-lg font-semibold mb-2"><span className="text-main font-bold">{(i + 1 < 10 ? `0${i + 1}` : i + 1)}.</span> {item.name}</h4>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <h4 className="text-xl 4xl:text-2xl font-bold mb-3">We make your next web application.</h4>
                    <p className="text-gray-600 text-sm">We don&apos;t just build websites; We craft digital experiences. With a passion for innovation and a commitment to excellence, We bring your ideas to life. Whether it&apos;s a sleek landing page, a robust e-commerce store, or a complex web application, We have the skills to make it happen.</p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 w-[60%] lg-max:w-[60%] lg:w-[80%]  sm:w-[60%] xxs:w-full mt-10 ml-8">
                        {awards.map((item, i) => (
                            <div key={i}>
                                <h4 className="text-4xl text-main font-bold">{item.number}{item.prefix}</h4>
                                <p className="text-sm text-gray-600 mt-1"> {item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </Container>
    );
};

export default Support;