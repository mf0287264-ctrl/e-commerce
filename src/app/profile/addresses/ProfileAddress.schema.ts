import * as z from "zod";
export const addressSchema = z.object({
  name: z.string().min(1, "Address name is required"),
  details: z.string().min(1, "Full address is required"),
  phone: z
    .string()
    .min(11, "Phone must be 11 digits")
    .max(11, "Phone must be 11 digits")
    .regex(/^01[0-9]{9}$/, "Enter a valid Egyptian phone number"),
  city: z.string().min(1, "City is required"),
});

export type AddressFormData = z.infer<typeof addressSchema>;
