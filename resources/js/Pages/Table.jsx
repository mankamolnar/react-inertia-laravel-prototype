import React, { useState, useEffect, useRef } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel
} from '@tanstack/react-table'
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import { Link } from '@inertiajs/react'


// TODO: HIBÁK DEBUGOLÁSA, BATCH INSERT, EGYMÁSRA HATÓ LEGÖRDÜLŐ LISTÁK
//       NYELVVÁLASZTÁS
//        repository
const Test = (props) => {

    const { data : globalFilter, setData : setGlobalFilter, post: filterPost } = useForm({
      filter: ""
    });
    const [ rowSelection, setRowSelection ] = useState({});
    const { data, setData, post } = useForm({
        id: "",
    });
    const firstRender = useRef(true);

    useEffect(() => {
      if (firstRender.current === true) {
        firstRender.current = false;
      } else {
        post("/delete-row");
      }
      
    }, [data])

    const deleteRow = (e, id) => {
        e.preventDefault();
        setData({id: id})
    }

    const columnHelper = createColumnHelper();

    const columns = [
      columnHelper.accessor('select', {
        cell: ({ row }) => <IndeterminateCheckbox checked={row.getIsSelected()} disabled={!row.getCanSelect()} indeterminate={row.getIsSomeSelected()} onChange={row.getToggleSelectedHandler()} />,
        header: ({ table }) => <IndeterminateCheckbox checked={table.getIsAllRowsSelected()} indeterminate={table.getIsSomeRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
        footer: () => <button onClick={batchDelete}>Összes törlés</button>,
      }),
      columnHelper.accessor('test_column', {
        cell: info => info.getValue(),
        header: () => <span>Test Column</span>,
        footer: () => <span>Test Column</span>,
      }),
      columnHelper.accessor('created_at', {
        cell: info => {console.log(info); return info.getValue()},
        header: () => <span>CA</span>,
        footer: () => <span>CA</span>,
      }),
      columnHelper.accessor('updated_at', {
        cell: info => info.getValue(),
        header: () => <span>UA</span>,
        footer: () => <span>UA</span>,
      }),
      columnHelper.accessor('delete', {
        cell: info => <button onClick={(e) => deleteRow(e, info.row.original.id)}>Delete</button>,
        header: () => <span>Delete</span>,
        footer: () => <span>Delete</span>,
      }),
      columnHelper.accessor('modify', {
        cell: info => <a href={`/modify-row/${info.row.original.id}`}>Modify</a>,
        header: () => <span>Modify</span>,
        footer: () => <span>Modify</span>,
      }),
    ]

    const { data: data2, setData: setData2, post: post2 } = useForm({
      ids: []
    });
    const firstRender2 = useRef(true);

    useEffect(() => {
      if (firstRender2.current === true) {
        firstRender2.current = false;
      } else {
        console.log(data2);
        post2("/batch-delete");
      }
      
    }, [data2])

    const batchDelete = () => {
      const ids = [];
      for (const selectedRow of Object.keys(rowSelection)) {
        console.log(selectedRow);
        ids.push(table.getRow(selectedRow).original.id);
      }
      setData2({ids: ids});
    };

    const [tableData, setTableData] = useState(() => [...props.data.data])
    const table = useReactTable({
      data: tableData,
      columns,
      state: {
        rowSelection
      },
      onRowSelectionChange: setRowSelection,
      getCoreRowModel: getCoreRowModel(),
      enableRowSelection: true
    });

    const search = () => {
      filterPost("/search-table");
    }

    useEffect(() => {
      setTableData(props.data.data);
    }, [props])

    return (
      <>
      <input type="text" value={globalFilter.filter} onChange={(e) => setGlobalFilter({filter: e.target.value})} placeholder="Keresés..." className="p-2 font-lg shadow border border-block" />
      <button onClick={() => search()} className="items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Keresés</button>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>

      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10">
          {
            props.data.links.map(link => (
              link.url ? (
                <li>
                  <a href={link.url} dangerouslySetInnerHTML={{__html: link.label}} className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"></a>
                </li>
              ) 
              : null
            ))
          }
        </ul>
      </nav>
      </>
    )
}

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}) {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  )
}

export default Test