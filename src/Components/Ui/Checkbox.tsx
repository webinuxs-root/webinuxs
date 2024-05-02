"use client"
import { ReactNode } from "react";

//Interface
interface Props {
    checked: boolean;
    onChange: (e: boolean) => void;
    isLevel?: boolean;
    level?: string | ReactNode;
    inputClassName?: string;
    tickClassName?: string;
}

const Checkbox = ({ checked, onChange, isLevel = true, level = "Click to checkbox", inputClassName, tickClassName }: Props) => {

    return (
        <div className="flex mt-3 gap-x-3 md:gap-x-3 xxs:gap-x-4 items-start mb-3">
            <div className={`relative ${isLevel ? "mt-[5px]" : ""}`}>
                <input
                    type="checkbox"
                    id="billingAddress"
                    className={`peer appearance-none border border-gray-400 w-[18px] h-[18px] rounded align-middle block checked:bg-main bg-white checked:border-main cursor-pointer ${inputClassName}`}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-px pointer-events-none opacity-0 invisible peer-checked:opacity-100 peer-checked:visible ${tickClassName}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </span>
            </div>
            {isLevel &&
                <div className="text-left">
                    <label htmlFor="billingAddress" className="text-[15px] text-primary cursor-pointer select-none">
                        {level}
                    </label>
                </div>
            }
        </div>
    );
};

export default Checkbox;