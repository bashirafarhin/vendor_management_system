"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import { useDelete } from "@/hooks/useDelete";
import {
  useTable,
  useSortBy,
  Column,
  HeaderGroup,
  Row,
  TableInstance,
  ColumnInstance,
} from "react-table";
import toast from "react-hot-toast";
import { Vendor } from "@/interface/Vendor/Vendor";

interface TableProps {
  columns: Column<Vendor>[];
  data: Vendor[];
  setData: React.Dispatch<React.SetStateAction<Vendor[]>>;
}

function Table({ columns, data, setData }: TableProps) {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  }: TableInstance<Vendor> = useTable<Vendor>({ columns, data }, useSortBy);

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const { error: deleteError, deleteData } = useDelete();

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError);
    }
  }, [deleteError]);

  const deleteSelected = async () => {
    const idsToDelete = data
      .filter((row) => selectedRows[row._id])
      .map((row) => row._id);

    if (idsToDelete.length === 0) return;

    toast.loading("Deleting vendors...");

    const result = await deleteData("/api/vendors", { ids: idsToDelete });

    if (result) {
      setData((prev) => prev.filter((row) => !selectedRows[row._id]));
      setSelectedRows({});
      toast.dismiss();
      toast.success("Vendors deleted successfully");
    }
  };

  const hasSelected = Object.values(selectedRows).some(Boolean);

  return (
    <div>
      <button
        onClick={deleteSelected}
        disabled={!hasSelected}
        className={`mb-4 px-4 py-2 text-white rounded ${
          hasSelected
            ? "bg-red-600 hover:bg-red-700"
            : "bg-gray-400 cursor-not-allowed"
        } hover:cursor-pointer`}
      >
        Delete Selected
      </button>

      <table {...getTableProps()} className="min-w-full table-auto border">
        <thead>
          {headerGroups.map((headerGroup: HeaderGroup<Vendor>) => {
            const { key, ...rest } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...rest} className="text-gray-600">
                <th className="px-4 py-2 border-b">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const allSelected: Record<string, boolean> = {};
                      rows.forEach((row) => {
                        allSelected[row.original._id] = checked;
                      });
                      setSelectedRows(allSelected);
                    }}
                    checked={
                      rows.length > 0 &&
                      rows.every((row) => selectedRows[row.original._id])
                    }
                  />
                </th>
                <th className="px-4 py-2 border-b">S.No.</th>
                {headerGroup.headers.map((column) => {
                  const { key: colKey, ...colRest } = column.getHeaderProps(
                    (
                      column as ColumnInstance<Vendor> & {
                        getSortByToggleProps?: () => object;
                      }
                    ).getSortByToggleProps?.()
                  );
                  return (
                    <th
                      key={colKey}
                      {...colRest}
                      className="px-4 py-2 text-left font-medium border-b"
                    >
                      {column.render("Header")}
                    </th>
                  );
                })}
                <th className="px-4 py-2 border-b">Edit</th>
              </tr>
            );
          })}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row: Row<Vendor>) => {
            prepareRow(row);
            const { key, ...rest } = row.getRowProps();
            return (
              <tr key={key} {...rest} className="border-b">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={!!selectedRows[row.original._id]}
                    onChange={() => toggleRow(row.original._id)}
                  />
                </td>
                <td className="px-4 py-2">{row.index + 1}</td>
                {row.cells.map((cell) => {
                  const { key: cellKey, ...cellRest } = cell.getCellProps();
                  return (
                    <td key={cellKey} {...cellRest} className="px-4 py-2">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                <td className="px-4 py-2">
                  <div
                    onClick={() =>
                      router.push(`/vendor/edit?id=${row.original._id}`)
                    }
                  >
                    <Button>Edit</Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
