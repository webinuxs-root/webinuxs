import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/Tenstack/Types/database.types";
import { PaginationInput } from "@/Tenstack/Types/Services/service";

export const GET_ALL_CATEGORIES = async (client: SupabaseClient<Database>, slug: string) => {
    const { data } = await client.from("category").select("*").neq("slug", slug).order("position", { ascending: true });
    return data;
}

export const GET_SERVICES = async (client: SupabaseClient<Database>, value: PaginationInput) => {
    const limit = 12
    const { from, to } = getPagination(value.page, limit)
    const query = client.from("product").select("*, category!inner(*)", { count: "exact" }).gte("regular_price", value.price[0]).lte("regular_price", value.price[1]).range(from, to).order("created_at", { ascending: true });
    if (value.category) {
        query.eq("category.slug", value.category)
    }
    if (value.query) {
        query.ilike("title", `%${value.query}%`)
    }
    const { data, count } = await query;
    return {
        data: data,
        count: count,
        page: value.page,
        totalPage: Math.ceil(Number(count) / limit)
    }
}

//Sub Functions
export const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 3
    const from = page ? page * limit : 0
    const to = page ? from + size - 1 : size - 1
    return { from, to };
};