import { createContext, Dispatch, SetStateAction } from "react";
import { Tables } from "@/Tenstack/Types/database.types";

//Interface
export interface CartTypes {
    created_at: string
    id: string
    product_id: string | null
    user_id: string | null
    product: Tables<"product"> | null;
}
export interface PriceTypes {
    subtotal: number;
    total: number;
    discount: number;
}
export interface CustomerTypes {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    purchase_notes: string;
}

interface Context {
    step?: number;
    setStep?: Dispatch<SetStateAction<number>>;
    selected?: CartTypes[];
    setSelected?: Dispatch<SetStateAction<CartTypes[]>>;
    price?: PriceTypes;
    setPrice?: Dispatch<SetStateAction<PriceTypes>>;
    customer?: CustomerTypes;
    setCustomer?: Dispatch<SetStateAction<CustomerTypes>>;
}

//Creating Context
export const CheckoutContext = createContext<Context>({});