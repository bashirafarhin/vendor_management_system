"use client";

import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { VendorSchema } from "@/lib/validation/vendor/vendorSchema";
import { usePost } from "@/hooks/usePost";
import VendorForm from "@/components/VendorForm";

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

  const { post, loading, error } = usePost<CreateVendorFormValues>("/api/vendors");

  const toastId = useRef<string | null>(null);

  const onSubmit = async (formData: CreateVendorFormValues) => {
    await post(formData);
  };

  useEffect(() => {
    if (loading && !toastId.current) {
      toastId.current = toast.loading("Creating vendor...");
    }

    if (!loading && error && toastId.current) {
      toast.error(error, { id: toastId.current });
      toastId.current = null;
    }

    if (!loading && !error && !isSubmitting && toastId.current) {
      toast.success("Vendor created successfully!", { id: toastId.current });
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
        buttonText="Create Vendor"
      />
    </form>
  );
};

export default CreateVendor;