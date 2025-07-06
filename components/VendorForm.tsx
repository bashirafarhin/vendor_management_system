"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { VendorSchema } from "@/lib/validation/vendor/vendorSchema";

type VendorFormValues = z.infer<typeof VendorSchema>;

interface Props {
  register: UseFormRegister<VendorFormValues>;
  errors: FieldErrors<VendorFormValues>;
  isSubmitting: boolean;
  loading: boolean;
  buttonText: string;
}

const VendorForm = ({ register, errors, isSubmitting, loading, buttonText }: Props) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium">Vendor Name *</label>
        <input {...register("vendorName")} className="w-full border px-3 py-2 rounded" />
        {errors.vendorName && <p className="text-sm text-red-500">{errors.vendorName.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Bank Account No. *</label>
        <input {...register("bankAccountNumber")} className="w-full border px-3 py-2 rounded" />
        {errors.bankAccountNumber && (
          <p className="text-sm text-red-500">{errors.bankAccountNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Bank Name *</label>
        <input {...register("bankName")} className="w-full border px-3 py-2 rounded" />
        {errors.bankName && <p className="text-sm text-red-500">{errors.bankName.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Address Line 1</label>
        <input {...register("addressLine1")} className="w-full border px-3 py-2 rounded" />
      </div>

      <div>
        <label className="block font-medium">Address Line 2 *</label>
        <input {...register("addressLine2")} className="w-full border px-3 py-2 rounded" />
         {errors.addressLine2 && <p className="text-sm text-red-500">{errors.addressLine2.message}</p>}
      </div>

      <div>
        <label className="block font-medium">City</label>
        <input {...register("city")} className="w-full border px-3 py-2 rounded" />
      </div>

      <div>
        <label className="block font-medium">Country</label>
        <input {...register("country")} className="w-full border px-3 py-2 rounded" />
      </div>

      <div>
        <label className="block font-medium">Zip Code</label>
        <input {...register("zipCode")} className="w-full border px-3 py-2 rounded" />
        {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode.message}</p>}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Submitting..." : buttonText}
        </button>
      </div>
    </div>
  );
};

export default VendorForm;