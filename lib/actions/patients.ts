"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function getPatients(search?: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  let query = supabase
    .from("patients")
    .select("*")
    .eq("doctor_id", user.id)
    .order("created_at", { ascending: false })

  if (search) {
    query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,phone.ilike.%${search}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching patients:", error)
    return []
  }

  return data || []
}

export async function getPatient(id: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("id", id)
    .eq("doctor_id", user.id)
    .single()

  if (error) {
    console.error("Error fetching patient:", error)
    return null
  }

  return data
}

export async function createPatient(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const patientData = {
    doctor_id: user.id,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string || null,
    email: formData.get("email") as string || null,
    birth_date: formData.get("birth_date") as string || null,
    gender: formData.get("gender") as string || null,
    notes: formData.get("notes") as string || null,
  }

  const { data, error } = await supabase
    .from("patients")
    .insert(patientData)
    .select()
    .single()

  if (error) {
    redirect("/patients/new?error=" + encodeURIComponent(error.message))
  }

  // Create audit log
  await supabase.from("audit_logs").insert({
    doctor_id: user.id,
    action: "patient_created",
    entity_type: "patient",
    entity_id: data.id,
    metadata: { patient_name: `${patientData.first_name} ${patientData.last_name}` },
  })

  revalidatePath("/patients")
  redirect("/patients/" + data.id)
}

export async function updatePatient(id: string, formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const patientData = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string || null,
    email: formData.get("email") as string || null,
    birth_date: formData.get("birth_date") as string || null,
    gender: formData.get("gender") as string || null,
    notes: formData.get("notes") as string || null,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase
    .from("patients")
    .update(patientData)
    .eq("id", id)
    .eq("doctor_id", user.id)

  if (error) {
    redirect("/patients/" + id + "/edit?error=" + encodeURIComponent(error.message))
  }

  // Create audit log
  await supabase.from("audit_logs").insert({
    doctor_id: user.id,
    action: "patient_updated",
    entity_type: "patient",
    entity_id: id,
    metadata: { patient_name: `${patientData.first_name} ${patientData.last_name}` },
  })

  revalidatePath("/patients")
  revalidatePath("/patients/" + id)
  redirect("/patients/" + id)
}

export async function deletePatient(id: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { error } = await supabase
    .from("patients")
    .delete()
    .eq("id", id)
    .eq("doctor_id", user.id)

  if (error) {
    return { error: error.message }
  }

  // Create audit log
  await supabase.from("audit_logs").insert({
    doctor_id: user.id,
    action: "patient_deleted",
    entity_type: "patient",
    entity_id: id,
  })

  revalidatePath("/patients")
  redirect("/patients")
}
