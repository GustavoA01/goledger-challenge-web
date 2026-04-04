"use server"
import { redirect } from "next/navigation"

export const handleSearch = async (formData: FormData) => {
  const query = formData.get("query")?.toString() || ""
  redirect(`/?query=${encodeURIComponent(query)}`)
}
