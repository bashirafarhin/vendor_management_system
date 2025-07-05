"use client";

import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { VendorSchema } from "@/lib/validation/vendor/vendorSchema";
import { usePost } from "@/hooks/usePost";
import Button from "@/components/ui/Button";

type CreateVendorFormValues = z.infer<typeof VendorSchema>;

const CreateVendor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateVendorFormValues>({
    resolver: zodResolver(VendorSchema),
  });

  const { post, loading, error } = usePost<CreateVendorFormValues>(
    "/api/vendors"
  );

  const toastId = useRef<string | null>(null);

  // Triggered on form submit
  const onSubmit = async (formData: CreateVendorFormValues) => {
    await post(formData);
  };

  // Toast feedback based on loading/error/res
  useEffect(() => {
    if (loading && !toastId.current) {
      toastId.current = toast.loading("Creating vendor...");
    }

    if (!loading && error && toastId.current) {
      console.log(error);
      toast.error(error, { id: toastId.current });
      toastId.current = null;
    }

    if (!loading && !error && !isSubmitting && toastId.current) {
      toast.success("Vendor created successfully!", { id: toastId.current });
      toastId.current = null;
      reset(); // reset form after success
    }
  }, [loading, error, isSubmitting, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Vendor Name */}
      <div>
        <label className="block font-medium">Vendor Name *</label>
        <input
          {...register("vendorName")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.vendorName && (
          <p className="text-sm text-red-500">{errors.vendorName.message}</p>
        )}
      </div>

      {/* Bank Account No */}
      <div>
        <label className="block font-medium">Bank Account No. *</label>
        <input
          {...register("bankAccountNumber")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.bankAccountNumber && (
          <p className="text-sm text-red-500">
            {errors.bankAccountNumber.message}
          </p>
        )}
      </div>

      {/* Bank Name */}
      <div>
        <label className="block font-medium">Bank Name *</label>
        <input
          {...register("bankName")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.bankName && (
          <p className="text-sm text-red-500">{errors.bankName.message}</p>
        )}
      </div>

      {/* Address Line 1 */}
      <div>
        <label className="block font-medium">Address Line 1 *</label>
        <input
          {...register("addressLine1")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.addressLine1 && (
          <p className="text-sm text-red-500">{errors.addressLine1.message}</p>
        )}
      </div>

      {/* Address Line 2 */}
      <div>
        <label className="block font-medium">Address Line 2</label>
        <input
          {...register("addressLine2")}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* City */}
      <div>
        <label className="block font-medium">City</label>
        <input
          {...register("city")}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Country */}
      <div>
        <label className="block font-medium">Country</label>
        <input
          {...register("country")}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Zip Code */}
      <div>
        <label className="block font-medium">Zip Code</label>
        <input
          {...register("zipCode")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.zipCode && (
          <p className="text-sm text-red-500">{errors.zipCode.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button disabled={isSubmitting || loading}>
          {loading ? "Submitting..." : "Create Vendor"}
        </Button>
      </div>
    </form>
  );
};

export default CreateVendor;