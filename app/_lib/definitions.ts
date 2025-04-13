import { number, z } from "zod";

export const TagSchema = z.object({
  tagname: z
    .string()
    .min(1, "Please provide a tagname")
    .max(255, "Character limit reach"),
});

export const ChatScriptsSchema = z.object({
  script_title: z
    .string()
    .min(1, "Please provide chat script title")
    .max(255, "Character limit reach"),

  scripts: z
    .string()
    .min(1, "Please provide chat scripts")
    .max(255, "Character limit reach"),

  associated_tags: z.string().min(1, "Please associate at least one tag"),
});

export const CompanyDetailsSchema = z.object({
  company_name: z
    .string()
    .min(1, "Please provide company details")
    .max(255, "Character limit reach"),

  company_details: z
    .string()
    .min(1, "Please provide company details")
    .max(255, "Character limit reach"),
});
