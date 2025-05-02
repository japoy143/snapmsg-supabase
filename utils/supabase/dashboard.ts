"use server";

import { CompanyDetailsSchema } from "@/app/_lib/definitions";
import { createClient } from "./server";
import { revalidatePath } from "next/cache";

/*
ACTIONS
*/

export async function provideCompanyDetails(state: any, formData: FormData) {
  const validation = CompanyDetailsSchema.safeParse({
    company_name: formData.get("company_name"),
    company_details: formData.get("company_details"),
  });

  if (!validation.success) {
    return { error: validation.error.flatten().fieldErrors };
  }

  //provide company details or update
  const supabase = await createClient();
  const { error } = await supabase
    .from("user_details")
    .update({
      company_name: formData.get("company_name"),
      company_details: formData.get("company_details"),
      isCompanySet: true,
    })
    .eq("auth_user_id", formData.get("id"));

  revalidatePath("/protected");
  return { success: true };
}
