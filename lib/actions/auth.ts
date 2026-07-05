"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect("/login?error=" + encodeURIComponent(error.message))
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const fullName = formData.get("full_name") as string

  const { data: { user }, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    redirect("/signup?error=" + encodeURIComponent(error.message))
  }

  // Create profile after signup
  if (user) {
    await supabase.from("profiles").upsert({
      user_id: user.id,
      full_name: fullName || user.email?.split("@")[0] || "Doctor",
      email: user.email || "",
      role: "doctor",
    })
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}
