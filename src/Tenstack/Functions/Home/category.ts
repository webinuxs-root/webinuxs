import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/Tenstack/Types/database.types";

export const GET_CATEGORY_HOMES = async (client: SupabaseClient<Database>) => {
    const { data } = await client.from("category").select("*").order("position", { ascending: true }).range(0, 11).throwOnError();
    return data;
}