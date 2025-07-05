"use client";

import { useFetch } from "@/hooks/useFetch";
import EditVendor from "./_component/EditVendor";
import { useSearchParams } from "next/navigation";

interface Vendor {
  _id: string;
  vendorName: string;
  bankAccountNumber: string;
  bankName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  country: string;
  zipCode: string;
}

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    data: vendor,
    loading,
    error,
  } = useFetch<Vendor>(`/api/vendors/${id}`);

  if (loading) return <div>Loading vendor...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!vendor) return <div>Vendor not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Vendor</h2>
      <EditVendor vendor={vendor} />
    </div>
  );
};

export default Page;