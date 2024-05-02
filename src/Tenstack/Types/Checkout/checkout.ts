export interface OrderInput {
    subtotal: number;
    coupon_discount: number;
    total: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    purchase_notes: string;
    user_id: string
}

export interface OrderProductInput {
    product_id: string;
    quantity: number;
    price: number;
    order_id: string;
}