import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { Ellipsis } from 'lucide-react'
import CheckData from '../../../constants/check.json'
import dayjs from 'dayjs'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'

const Check = () => {
    const [rowSelection, setRowSelection] = React.useState({})

    const columns = [
        {
            header: 'Name',
            accessorKey: 'name',
            cell: info => (
                <div className='flex gap-1'>
                    <div className='flex items-center'>
                        <input
                            id='red-checkbox'
                            type='checkbox'
                            value=''
                            className='w-4 h-4 cursor-pointer checked:bg-[#422afb] forced-colors:bg-[#422afb] text-[#422afb] bg-gray-100 border-gray-300 rounded-sm focus:ring-[#422afb] focus:ring-2'
                        />
                        <label htmlFor='red-checkbox' className='ms-2 text-sm font-medium text-gray-900' />
                    </div>
                    <span>{info.row.original?.name}</span>
                </div>
            ),
        },
        {
            header: 'Progress',
            accessorKey: 'progress',
            cell: info => <span>{info.row.original?.progress}%</span>,
        },
        {
            header: 'Quantity',
            accessorKey: 'quantity',
            cell: info => info.getValue(),
        },
        {
            header: 'Date',
            accessorKey: 'date',
            cell: info => (
                <div className='text-left'>
                    <span className='py-4 text-sm font-bold text-black'>{dayjs(info.row.original?.date).format('DD.MMM.YYYY')}</span>
                </div>
            ),
        },
    ]

    const table = useReactTable({
        data: CheckData,
        columns,
        state: {
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div className='w-full bg-white rounded-xl rounded-b-xl'>
            <div className='flex justify-between p-[20px]'>
                <h3 className='text-[22px] font-bold'>Check Table</h3>
                <Menu>
                    <MenuButton className='bg-[#f4f7fe] rounded-xl p-2'>
                        <Ellipsis className='text-[#422afb]' />
                    </MenuButton>
                    <MenuList>
                        <MenuItem command='⌘T'>New Tab</MenuItem>
                        <MenuItem command='⌘N'>New Window</MenuItem>
                        <MenuItem command='⌘⇧N'>Open Closed Tab</MenuItem>
                        <MenuItem command='⌘O'>Open File...</MenuItem>
                    </MenuList>
                </Menu>
            </div>
            <div className=''>
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left rtl:text-right text-gray-500 border-0 rounded-b-xl'>
                        <thead className='text-xs text-[#a0aec0] uppercase border-b-2 border-[#e2e8f0]'>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th className='px-6 py-3 text-sm leading-3' key={header.id}>
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    {...{
                                                        className: header.column.getCanSort() ? 'cursor-pointer select-none flex' : '',
                                                        onClick: header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr className='bg-white' key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td className='px-6 py-4 text-sm font-bold text-gray-900 whitespace-nowrap' key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Check
