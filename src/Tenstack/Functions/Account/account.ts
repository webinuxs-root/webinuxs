import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/Tenstack/Types/database.types";
import { RegisterInput } from "@/Tenstack/Types/Account/account";

export const CREATE_ACCOUNT = async (client: SupabaseClient<Database>, value: RegisterInput) => {
    const { data, error } = await client.auth.signUp(value);
    if (error) throw error;
    return data
}


export const LOGIN_ACCOUNT = async (client: SupabaseClient<Database>, value: RegisterInput) => {
    const { data, error } = await client.auth.signInWithPassword(value);
    if (error) throw error;
    return data
}

export const LOGOUT_ACCOUNT = async (client: SupabaseClient<Database>) => {
    const { error } = await client.auth.signOut();
    if (error) throw error;
    return true
}