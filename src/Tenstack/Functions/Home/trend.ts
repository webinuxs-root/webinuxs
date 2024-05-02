import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/Tenstack/Types/database.types";

export const GET_TREND_LIST = async (client: SupabaseClient<Database>) => {
    const { data } = await client.from("campaign").select("*, campaign_join (id, product (*))").single().throwOnError();
    return data;
}