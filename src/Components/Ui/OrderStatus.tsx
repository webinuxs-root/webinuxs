import { FaCheck } from "react-icons/fa6";

//Interface
interface Props {
    status: string;
}
const OrderStatus = ({ status }: Props) => {
    const isComplete = (id: number) => {
        if (status === "ordered") {
            if (id <= 1) {
                return true
            } else {
                return false
            }
        }
        if (status === "reviewed") {
            if (id <= 2) {
                return true
            } else {
                return false
            }
        }
        if (status === "confirmed") {
            if (id <= 3) {
                return true
            } else {
                return false
            }
        }
        return false;
    }

    return (
        <div className="mt-10 mb-14">
            <div className="w-[65%] msm:w-[65%] sm:w-[75%] xxs:w-[85%] mx-auto">
                <div className="w-full relative flex items-center justify-between">
                    {StepperBtn.map((item, i) => (
                        <div className={`border border-solid p-5 rounded-full w-4 h-4 z-10 relative bg-white ${status === "cancelled" ? "border-gray-200" : (isComplete(item.serial) ? "border-green-600" : "border-main")}`} key={i}>
                            {isComplete(item.serial) ? <span className="absolute top-1/2 left-1/1  -translate-x-1/2 -translate-y-1/2 text-green-600"><FaCheck /></span> : <span className={`rounded-full w-2 h-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${status === "cancelled" ? "bg-gray-500" : "bg-main"}`} />}
                            <p className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 text-sm capitalize ${isComplete(item.serial) ? "text-green-600 font-semibold" : "text-gray-600"}`}>{status === "cancelled" ? status : item.name}</p>
                        </div>
                    ))}
                    <div className={`absolute left-2 right-2 top-1/2 -translate-y-1/2 h-[1px] ${status === "cancelled" ? "bg-gray-400" : "bg-main"}`} />
                    <div className={`absolute left-2 top-1/2 -translate-y-1/2 h-[2px] bg-green-600`} style={{ width: (status === "ordered" || status === "cancelled") ? "0%" : status === "reviewed" ? "50%" : "96%" }} />
                </div>
            </div>
        </div>
    );
};

export default OrderStatus;

export const StepperBtn = [
    {
        name: "Ordered",
        id: "ordered",
        serial: 1
    },
    {
        name: "Reviewed",
        id: "reviewed",
        serial: 2
    },
    {
        name: "Confirmed",
        id: "confirmed",
        serial: 3
    }
]