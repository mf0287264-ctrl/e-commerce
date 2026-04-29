import * as z from "zod";
export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(25, "Name must be less than 25 characters"),

    email: z.email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),

    rePassword: z.string(),

    phone: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),

    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });
export type formDataType = z.infer<typeof signUpSchema>;
