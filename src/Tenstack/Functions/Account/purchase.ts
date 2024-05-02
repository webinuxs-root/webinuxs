import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/Tenstack/Types/database.types";

export const GET_MY_PURCHASE = async (client: SupabaseClient<Database>) => {
    const { data } = await client.from("orders").select("*, order_products(*, product(*))").order("created_at", { ascending: true })
    return data;
}