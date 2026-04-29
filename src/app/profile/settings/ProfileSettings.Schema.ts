import * as z from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters.")
    .max(64, "Full name must be at most 64 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters.")
    .max(20, "Phone number must be at most 20 characters."),
});

export type ProfileInfo = z.infer<typeof formSchema>;
