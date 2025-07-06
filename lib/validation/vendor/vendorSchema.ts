import { z } from 'zod';

export const VendorSchema = z.object({
  vendorName: z.string().min(1, 'Vendor Name is required'),
  bankAccountNumber: z
    .string()
    .min(1, 'Bank Account Number is required')
    .regex(/^\d+$/, 'Must be a valid number'),
  bankName: z.string().min(1, 'Bank Name is required'),
  addressLine1: z.string().optional(),
  addressLine2: z.string().min(1, 'Address Line 2 is required'),
  city: z.string().optional(),
  country: z.string().optional(),
  zipCode: z
    .string()
    .regex(/^\d{4,6}$/, 'Zip Code must be between 4 to 6 digits')
    .optional()
});