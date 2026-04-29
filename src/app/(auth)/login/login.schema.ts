import * as z from "zod";
export const logInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Incorrect password")
    .regex(/[A-Z]/, "Incorrect password")
    .regex(/[0-9]/, "Incorrect password"),
});

export type formDataInputType = z.infer<typeof logInSchema>;
