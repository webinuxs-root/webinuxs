import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/Tenstack/Types/database.types";

export const GET_MATRIX = async (client: SupabaseClient<Database>) => {
    const { count: orderCount, data } = await client.from("orders").select("*", { count: "exact" });
    const { count: cartCount } = await client.from("cart").select("*", { count: "exact" })
    return {
        totalOrder: orderCount,
        totalAmount: data?.reduce((acc, obj) => acc + (obj.total || 0), 0),
        cartCount: cartCount
    }
}