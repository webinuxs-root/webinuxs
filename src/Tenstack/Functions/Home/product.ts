import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/Tenstack/Types/database.types";

export const GET_HOME_PRODUCT_LIST = async (client: SupabaseClient<Database>) => {
    const { data } = await client.from("feature_product").select("*, product (*)").order("id", { ascending: true }).throwOnError();
    return data;
}

export const GET_RECENT_PRODUCT = async (client: SupabaseClient<Database>) => {
    const { data } = await client.from("product").select("*").order("created_at", { ascending: true }).range(0, 7).throwOnError();
    return data;
}