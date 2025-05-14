"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}

// Function to fetch all data from the "Todos" table
export async function getAllData() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("Todos").select();

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  return data;
}

// Function to delete data from the "Todos" table
export async function deleteData(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("Todos").delete().eq("id", id);
  revalidatePath("/");

  if (error) {
    console.error("Error deleting data:", error);
    return false;
  }

  return true;
}

// Function to add data to the "Todos" table
export async function postData(info: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("Todos").insert([{ info }]);
  revalidatePath("/");

  if (error) {
    console.error("Error adding data:", error);
    return false;
  }

  return true;
}
