import CreateVendor from "./_component/CreateVendor";

export default function CreateVendorPage() {
  return (
    <div className="mx-auto px-4 py-12 w-[50vw] sm:max-w-[90vw]">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Vendor</h1>
      <CreateVendor />
    </div>
  );
}
