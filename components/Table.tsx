// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Button from "./ui/Button";
// import {
//   useTable,
//   useSortBy,
//   Column,
//   HeaderGroup,
//   Row,
//   TableInstance,
//   ColumnInstance
// } from "react-table";

// interface TableProps<T extends { id: string | number }> {
//   columns: Column<T>[];
//   data: T[];
//   setData: React.Dispatch<React.SetStateAction<T[]>>;
// }

// function Table<T extends { id: string | number }>({
//   columns,
//   data,
//   setData,
// }: TableProps<T>) {
//   const router = useRouter();
//   const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   }: TableInstance<T> = useTable<T>({ columns, data }, useSortBy);

//   const toggleRow = (id: string | number) => {
//     setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const deleteSelected = () => {
//     const newData = data.filter((row) => !selectedRows[row.id]);
//     console.log(newData);
//     setData(newData);
//     setSelectedRows({});
//   };

//   const hasSelected = Object.values(selectedRows).some((selected) => selected);

//   return (
//     <div>
//       <button
//         onClick={deleteSelected}
//         disabled={!hasSelected}
//         className={`mb-4 px-4 py-2 text-white rounded ${
//           hasSelected
//             ? "bg-red-600 hover:bg-red-700"
//             : "bg-gray-400 cursor-not-allowed"
//         } hover:cursor-pointer`}
//       >
//         Delete Selected
//       </button>
//       <table {...getTableProps()} className="min-w-full table-auto border">
//         <thead>
//           {headerGroups.map((headerGroup: HeaderGroup<T>) => {
//             const { key, ...rest } = headerGroup.getHeaderGroupProps();
//             return (
//               <tr key={key} {...rest} className="text-gray-600">
//                 <th className="px-4 py-2 border-b">
//                   <input
//                     type="checkbox"
//                     onChange={(e) => {
//                       const checked = e.target.checked;
//                       const allSelected: Record<string, boolean> = {};
//                       rows.forEach((row) => {
//                         allSelected[row.original.id] = checked;
//                       });
//                       setSelectedRows(allSelected);
//                     }}
//                     checked={
//                       rows.length > 0 &&
//                       rows.every((row) => selectedRows[row.original.id])
//                     }
//                   />
//                 </th>
//                 {headerGroup.headers.map((column) => {
//                   const { key: colKey, ...colRest } = column.getHeaderProps(
//                     (column as ColumnInstance<T> & { getSortByToggleProps?: () => object }).getSortByToggleProps?.()
//                   );
//                   return (
//                     <th
//                       key={colKey}
//                       {...colRest}
//                       className="px-4 py-2 text-left font-medium border-b"
//                     >
//                       {column.render("Header")}
//                     </th>
//                   );
//                 })}
//                 <th className="px-4 py-2 border-b">
//                   Edit
//                 </th>
//               </tr>
//             );
//           })}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row: Row<T>) => {
//             prepareRow(row);
//             const { key, ...rest } = row.getRowProps();
//             return (
//               <tr key={key} {...rest} className="border-b">
//                 <td className="px-4 py-2">
//                   <input
//                     type="checkbox"
//                     checked={!!selectedRows[row.original.id]}
//                     onChange={() => toggleRow(row.original.id)}
//                   />
//                 </td>
//                 {row.cells.map((cell) => {
//                   const { key: cellKey, ...cellRest } = cell.getCellProps();
//                   return (
//                     <td key={cellKey} {...cellRest} className="px-4 py-2">
//                       {cell.render("Cell")}
//                     </td>
//                   );
//                 })}
//                 <td className="px-4 py-2">
//                   <div onClick={() =>
//                       router.push(`/edit-vendors?id=${row.original.id}`)
//                     }>
//                     <Button>Edit</Button>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Table;
"use client";

import React, { useState } from "react";
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

// Define vendor type explicitly
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

  // const deleteSelected = () => {
  //   const newData = data.filter((row) => !selectedRows[row._id]);
  //   setData(newData);
  //   setSelectedRows({});
  // };

  const {
    // loading: deleteLoading,
    error: deleteError,
    deleteData,
  } = useDelete();

  if(deleteError){
    toast.error(deleteError);
  }

  const deleteSelected = async () => {
    const idsToDelete = data
      .filter((row) => selectedRows[row._id])
      .map((row) => row._id);

    if (idsToDelete.length === 0) return;

    const result = await deleteData("/api/vendors", { ids: idsToDelete });

    if (result) {
      const newData = data.filter((row) => !selectedRows[row._id]);
      setData(newData);
      setSelectedRows({});
    } else {
      alert(deleteError || "Delete failed.");
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
                      router.push(`/edit-vendors?id=${row.original._id}`)
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
