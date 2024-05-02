import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/Tenstack/Types/database.types";
import { OrderInput, OrderProductInput } from "@/Tenstack/Types/Checkout/checkout";

export const CHECK_COUPON = async (client: SupabaseClient<Database>, code: string) => {
    const { data } = await client.from("coupon").select("*").eq("code", code).single()
    return data;
}

export const ADD_ORDER = async (client: SupabaseClient<Database>, value: OrderInput) => {
    const { data } = await client.from("orders").insert([value]).select("*").single().throwOnError();
    return data;
}

export const ADD_ORDER_PRODUCT = async (client: SupabaseClient<Database>, value: OrderProductInput[]) => {
    const { data } = await client.from("order_products").insert(value).throwOnError();
    return data;
}

export const DELETE_ALL_CART = async (client: SupabaseClient<Database>, user: string) => {
    const { data } = await client.from("cart").delete().eq("user_id", user).throwOnError();
    return data;
}

export const CANCEL_PURCHASE = async (client: SupabaseClient<Database>, id: string) => {
    const { data } = await client.from("orders").update({
        status: "cancelled"
    }).eq("id", id).throwOnError();
    return data;
}