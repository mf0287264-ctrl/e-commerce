import * as z from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    password: z
      .string()
      .min(6, "Must be at least 6 characters.")
      .max(64, "Password must be at most 64 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    rePassword: z.string().min(1, "Please confirm your new password."),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match.",
    path: ["rePassword"],
  })
  .refine((data) => data.password !== data.currentPassword, {
    message: "New password must be different from current password",
    path: ["password"],
  });

export type ChangePasswordInfo = z.infer<typeof changePasswordSchema>;
