import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/Tenstack/Types/database.types";

export const GET_REVIEW_LIST = async (client: SupabaseClient<Database>) => {
    const { data } = await client.from("client_review").select("*").throwOnError();
    return data;
}