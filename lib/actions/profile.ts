"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function createProfile(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "No user found" }
  }

  const { error } = await supabase.from("profiles").upsert({
    user_id: user.id,
    full_name: formData.get("full_name") as string || user.email?.split("@")[0] || "Doctor",
    email: user.email || "",
    role: "doctor",
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function getProfile() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single()

  return profile
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "No user found" }
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
    })
    .eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/settings")
  return { success: true }
}
