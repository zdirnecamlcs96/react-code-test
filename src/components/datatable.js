"use client";

import { useReactTable, flexRender, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon, ChevronRightIcon, ChevronLeftIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/20/solid';
import DebouncedInput from "@/components/debouncedInput";
import { rankItem } from '@tanstack/match-sorter-utils';

export default function Datatable({ initialData }) {

    const [data, setData] = useState(initialData);
    const [sorting, setSorting] = useState([])
    const [globalFilter, setGlobalFilter] = useState('')

    const columns = [
        {
            header: "Name",
            accessorKey: "name"
        },
        {
            header: "Email",
            accessorKey: "email"
        },
        {
            header: "Phone",
            accessorKey: "phone"
        },
        {
            header: "Action",
            accessorKey: "id",
            cell: props => {
            return (
                <Link href={`/user/${props.getValue()}`} className="text-blue-500 hover:text-blue-700 font-semibold leading-6">View</Link>
            )
            }
        }
    ];

    const fuzzyFilter = (row, columnId, value, addMeta) => {
        // Rank the item
        const itemRank = rankItem(row.getValue(columnId), value)

        // Store the itemRank info
        addMeta({
            itemRank,
        })

        // Return if the item should be filtered in/out
        return itemRank.passed
    }

    const table = useReactTable({
        columns,
        data,
        initialState: {
            pagination: {
                pageSize: 5
            }
        },
        state: {
            sorting,
            globalFilter
        },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            <div className="bg-white rounded p-5 md:p-8 text-sm">
                <div className="text-gray-700 flex justify-between">
                    <select
                        className="p-2 rounded shadow border border-gray-300"
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                        >
                        {[3, 5, 10].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                            </option>
                        ))}
                    </select>
                    <DebouncedInput
                        value={globalFilter ?? ''}
                        onChange={value => setGlobalFilter(String(value))}
                        className="p-2 rounded shadow border border-gray-300 ml-2"
                        placeholder="Search all columns..."
                    />
                </div>
                <div className="overflow-x-scroll">
                    <table className="table-auto w-full text-center">
                        <thead className="border-b-2">
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className="p-3 text-gray-700">
                                            <div
                                                {...{
                                                className: header.column.getCanSort()
                                                    ? 'cursor-pointer select-none flex justify-center'
                                                    : '',
                                                onClick: header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(header.column.columnDef.header,header.getContext())}
                                                {header.column.getIsSorted() === 'asc' ? <ChevronDownIcon className="h-6 w-6"/> : <ChevronUpIcon className="h-6 w-6"/>}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="border-t">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="p-3 text-gray-700">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="h-2" />
                <div className="flex items-center gap-2 text-gray-700">
                    <button
                        className="border rounded p-1 disabled:bg-slate-300 disabled:opacity-50"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronDoubleLeftIcon className="w-6 h-6" />
                    </button>
                    <button
                        className="border rounded p-1 disabled:bg-slate-300 disabled:opacity-50"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <button
                        className="border rounded p-1 disabled:bg-slate-300 disabled:opacity-50"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                    <button
                        className="border rounded p-1 disabled:bg-slate-300 disabled:opacity-50"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronDoubleRightIcon className="w-6 h-6" />
                    </button>
                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <input
                            type="number"
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            value={table.getState().pagination.pageIndex + 1}
                            onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                                table.setPageIndex(page)
                            }}
                            min={1}
                            max={table.getPageCount()}
                            className="border p-1 rounded w-16"
                        />
                        <strong>
                            of {table.getPageCount()}
                        </strong>
                    </span>
                </div>
            </div>
        </>
    )
}