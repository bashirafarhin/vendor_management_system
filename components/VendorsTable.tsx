"use client";

import { useState, useEffect } from "react";
import { Column } from "react-table";
import Table from "./Table";
import { useFetch } from "@/hooks/useFetch";
import Loader from "./ui/Loader";
import Button from "./ui/Button";
import { Vendor } from "@/interface/Vendor/Vendor";
import toast from "react-hot-toast";

const columns: Column<Vendor>[] = [
  {
    Header: "Name",
    accessor: "vendorName",
  },
  {
    Header: "Account Number",
    accessor: "bankAccountNumber",
  },
  {
    Header: "Bank Name",
    accessor: "bankName",
  },
  {
    Header: "City",
    accessor: "city",
  },
  {
    Header: "Country",
    accessor: "country",
  },
];

const VendorsTable = () => {
  const [tableData, setTableData] = useState<Vendor[]>([]);
  const [page, setPage] = useState<number>(1);
  const [noMoreVendors, setNoMoreVendors] = useState(false);
  const {
    data: vendors,
    loading,
    error,
  } = useFetch<Vendor[]>(`/api/vendors?page=${page}`);

  useEffect(() => {
    if (vendors) {
      if (vendors.length === 0) {
        setNoMoreVendors(true);
      } else {
        setTableData((prev) => (page === 1 ? vendors : [...prev, ...vendors]));
      }
    }
  }, [vendors, page]);

  useEffect(() => {
  if (error) {
    toast.error(error);
  }
}, [error]);


  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-medium mb-4">Vendors</h2>
      <p className="text-sm font-medium">To delete mark the check box</p>
      <p className="text-sm font-medium mb-4">Only 3 rows will be fetched per page</p>
      {vendors && <Table columns={columns} data={tableData} setData={setTableData} />}
      <div className="my-3" onClick={() => setPage(prev => prev + 1)}>
        <Button disabled={noMoreVendors}>
          {noMoreVendors ? "No more vendors" : "Load more Vendors"}
        </Button>
      </div>
    </div>
  );
};

export default VendorsTable;
