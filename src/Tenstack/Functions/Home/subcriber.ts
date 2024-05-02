import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/Tenstack/Types/database.types";
import { EmailInputs } from "@/Tenstack/Types/Home/subscriber";

export const ADD_EMAIL_SUBSCRIBER = async (client: SupabaseClient<Database>, value: EmailInputs) => {
    const { data } = await client.from("email_subscriber").insert([value]).throwOnError();
    return data;
}