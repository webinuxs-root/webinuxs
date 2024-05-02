import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/Tenstack/Types/database.types";
import { ProfileInput } from "@/Tenstack/Types/Account/profile";

export const GET_PROFILE = async (client: SupabaseClient<Database>) => {
    const { data } = await client.auth.getUser();
    return data;
}


export const UPDATE_PROFILE = async (client: SupabaseClient<Database>, value: ProfileInput) => {
    const { data, error } = await client.auth.updateUser({
        data: value
    })
    if (error) throw error;
    return data;
}

export const UPLOAD_PROFILE_IMAGE = async (client: SupabaseClient<Database>, file: File) => {
    let fileExtension: string = '';
    if (file) {
        if (file.name) {
            fileExtension = file.name.split('.').pop() || '';
        }
        if (!fileExtension && file.type != null) {
            fileExtension = file.type.split('/').pop() || '';
        }
    }
    const { data, error } = await client.storage.from("webinars").upload(`profile/profile-picture.${fileExtension}`, file, {
        cacheControl: "300",
        upsert: true
    })
    if (error) throw error;
    return data;
}
