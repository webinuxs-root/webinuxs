import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/Tenstack/Types/database.types";

export const GET_PRODUCT_BY_SLUG = async (client: SupabaseClient<Database>, slug: string) => {
    const { data } = await client.from("product").select("*, category(*)").eq("slug", slug).single().throwOnError();
    return data;
}

export const GET_SIMILAR_PRODUCT = async (client: SupabaseClient<Database>, category: string) => {
    const { data } = await client.from("product").select("*").eq("category", category).range(0, 3).throwOnError();
    return data;
}