import { number, z } from "zod";

export const TagSchema = z.object({
  tagname: z
    .string()
    .min(1, "Please provide a tagname")
    .max(255, "Character limit reach"),
});

export const ChatScriptsSchema = z.object({
  scripts: z
    .string()
    .min(1, "Please provide chat scripts")
    .max(255, "Character limit reach"),
  associated_tags: z.string().min(1, "Please associate at least one tag"),
});
