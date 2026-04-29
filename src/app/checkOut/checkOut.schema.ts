import * as z from "zod";
export const checkOutSchema = z.object({
  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(25, "City must be at most 25 characters"),
  details: z.string().min(5, "Details must be at least 5 characters"),
  phone: z
    .string()
    .regex(/^(\+20|0)?1[0125]\d{8}$/, "Enter a valid Egyptian phone number"),
  postalCode: z.string().regex(/^\d{5}$/, "Postal code must be 5 digits"),
});

export type CheckOutType = z.infer<typeof checkOutSchema>;
