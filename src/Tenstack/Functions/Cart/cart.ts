import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/Tenstack/Types/database.types";
import { CartInput } from "@/Tenstack/Types/Cart/cart";

export const ADD_TO_CART = async (client: SupabaseClient<Database>, value: CartInput) => {
    const { data } = await client.from("cart").insert([value]).throwOnError()
    return data;
}

export const GET_CART_LIST = async (client: SupabaseClient<Database>) => {
    const { data } = await client.from("cart").select("*, product(*)")
    return data;
}

export const DELETE_CART = async (client: SupabaseClient<Database>, id: string) => {
    const { data } = await client.from("cart").delete().eq("id", id).throwOnError();
    return data;
}