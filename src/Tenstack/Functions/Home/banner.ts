import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/Tenstack/Types/database.types";

export const GET_BANNER_LIST = async (client: SupabaseClient<Database>) => {
    const { data } = await client.from("banner").select("*").throwOnError();
    return data;
}