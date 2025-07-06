"use client";

import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { VendorSchema } from "@/lib/validation/vendor/vendorSchema";
import { usePut } from "@/hooks/usePut";
import { Vendor } from "@/interface/Vendor/Vendor";
import VendorForm from "@/components/VendorForm";

type EditVendorFormValues = z.infer<typeof VendorSchema>;

interface Props {
  vendor: Vendor;
}

const EditVendor = ({ vendor }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditVendorFormValues>({
    resolver: zodResolver(VendorSchema),
  });

  useEffect(() => {
    if (vendor) {
      reset(vendor);
    }
  }, [vendor, reset]);

  const { put, loading, error } = usePut<EditVendorFormValues>(`/api/vendors/${vendor._id}`);

  const toastId = useRef<string | null>(null);

  const onSubmit = async (formData: EditVendorFormValues) => {
    await put(formData);
  };

  useEffect(() => {
    if (loading && !toastId.current) {
      toastId.current = toast.loading("Updating vendor...");
    }

    if (!loading && error && toastId.current) {
      toast.error(error, { id: toastId.current });
      toastId.current = null;
    }

    if (!loading && !error && !isSubmitting && toastId.current) {
      toast.success("Vendor updated successfully!", { id: toastId.current });
      toastId.current = null;
      reset();
    }
  }, [loading, error, isSubmitting, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VendorForm
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        loading={loading}
        buttonText="Save"
      />
    </form>
  );
};

export default EditVendor;