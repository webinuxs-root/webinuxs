//UI
import { Container } from "../Ui";

const data = [
    {
        name: "Professional Support",
        description: "Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution for all your technical and managerial hurdles when developing a Mobile or Web Application."
    },
    {
        name: "Awesome Designs",
        description: "Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution for all your technical and managerial hurdles when developing a Mobile or Web Application."
    },
    {
        name: "Planning & Execution",
        description: "Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution for all your technical and managerial hurdles when developing a Mobile or Web Application."
    }
]

const awards = [
    { number: "160", prefix: "+", title: "Make Special Day" },
    { number: "20", prefix: "+", title: "Franchises" },
    { number: "100", prefix: "+", title: "Happy Clients" },
    { number: "1", prefix: "+", title: "Years in Business" },
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
                    <h4 className="text-xl 4xl:text-2xl font-bold mb-3">We make your special day Memorable.</h4>
                    <p className="text-gray-600 text-sm">Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution for all your technical and managerial hurdles when developing a Mobile or Web Application.</p>
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