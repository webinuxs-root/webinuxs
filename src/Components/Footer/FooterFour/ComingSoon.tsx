import { Dialog } from "@/Components/Ui";
import { FaGooglePlay } from "react-icons/fa";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
}

const ComingSoon = ({ open, onClose }: Props) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            className="w-[350px]"
        >
            <div className="text-center py-4">
                <FaGooglePlay className="text-4xl mx-auto text-main" />
                <h4 className="text-xl mt-3 font-semibold text-primary">Coming Soon</h4>
                <p className="w-[90%] mx-auto mt-1 mb-4">We are coming soon with the mobile application version</p>
                <button className="border border-solid border-main px-4 py-1.5 rounded text-main uppercase text-sm font-semibold" onClick={onClose}>
                    Close
                </button>
            </div>
        </Dialog>
    );
};

export default ComingSoon;