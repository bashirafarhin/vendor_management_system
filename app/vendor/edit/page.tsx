"use client";

import { useFetch } from "@/hooks/useFetch";
import EditVendor from "./_component/EditVendor";
import { useSearchParams } from "next/navigation";
import { Vendor } from "@/interface/Vendor/Vendor";
import Loader from "@/components/ui/Loader";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    data: vendor,
    loading,
    error,
  } = useFetch<Vendor>(id ? `/api/vendors/${id}` : "");

  if (!vendor || loading) return <Loader />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="mx-auto px-4 py-12 w-[50vw] sm:max-w-[90vw]">
      <h2 className="text-xl font-bold mb-4 text-center">Edit Vendor</h2>
      <EditVendor vendor={vendor} />
    </div>
  );
};

export default Page;
