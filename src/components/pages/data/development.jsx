import React, { useState } from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Progress } from '@chakra-ui/react'
import { Ellipsis, Plus, Trash2 } from 'lucide-react'
import { FaApple, FaWindows, FaAndroid } from 'react-icons/fa6'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    NumberInput,
    NumberInputField,
} from '@chakra-ui/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useStoreDevelopment } from '../../../store/development'

const schema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    // tech: z.any(),
    date: z.string().date(),
    progress: z.any(),
})

const Development = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState({})
    const [random, setRandom] = useState(0)
    const { developmentData, addDevelopment, deleteDevelopment } = useStoreDevelopment()

    const [tech, setTech] = useState({
        apple: false,
        android: false,
        windows: false,
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm({
        resolver: zodResolver(schema),
    })

    const columns = [
        {
            header: 'Name',
            accessorKey: 'name',
            cell: info => info.getValue(),
        },
        {
            header: 'Tech',
            accessorKey: 'tech',
            cell: info => {
                let techList = info.row.original?.tech
                return (
                    <div className='flex gap-2'>
                        {techList.apple && <FaApple size={'15px'} className='text-[#8f9bba]' />}
                        {techList.android && <FaAndroid size={'15px'} className='text-[#8f9bba]' />}
                        {techList.windows && <FaWindows size={'15px'} className='text-[#8f9bba]' />}
                    </div>
                )
            },
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
        {
            header: 'Progress',
            accessorKey: 'progress',
            cell: info => (
                <div className='flex gap-2'>
                    <span className='text-xs font-bold text-black'>{info.row.original?.progress}%</span>
                    <div className='w-full'>
                        <Progress className='rounded-lg bg-[#eff4fb]' value={info.row.original?.progress} />
                    </div>
                </div>
            ),
        },
        {
            header: 'Action',
            cell: info => (
                <Trash2 size={'15px'} className='text-red-700 cursor-pointer' onClick={() => handleDelete(info.row.original?.id)} />
            ),
        },
    ]

    const table = useReactTable({
        data: developmentData ?? [],
        columns,
        state: {
            rowSelection,
            columnFilters
        },
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
    })

    const onSubmit = data => {
        const payload = {
            id: uuidv4(),
            name: data.name,
            tech,
            date: data.date,
            progress: parseInt(data.progress > 100 ? 100 : data.progress),
        }
        addDevelopment(payload)
    }

    const handleDelete = id => {
        deleteDevelopment(id)
    }

    const handleRandom = () => {
        let val = Math.floor(Math.random() * 101)
        setRandom(val)
        setValue('progress', val)
    }

    return (
        <div className='w-full bg-white rounded-xl rounded-b-xl'>
            <div className='flex justify-between p-[20px]'>
                <h3 className='text-[22px] font-bold'>Development Table</h3>
                <Menu>
                    <MenuButton className='bg-[#f4f7fe] rounded-xl p-2'>
                        <Ellipsis className='text-[#422afb]' />
                    </MenuButton>
                    <MenuList>
                        <MenuItem command='+' onClick={onOpen}>
                            Add
                        </MenuItem>
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
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Add</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='grid grid-col-2 gap-4'>
                                {/* Name */}
                                <FormControl isInvalid={errors.name}>
                                    <FormLabel htmlFor='name'>First name</FormLabel>
                                    <Input id='name' placeholder='name' {...register('name')} />
                                    <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                                </FormControl>
                                {/* Tech */}
                                <FormControl>
                                    <FormLabel htmlFor='tech'>Tech</FormLabel>
                                    <div className='flex justify-around gap-3'>
                                        <div className='flex items-center mb-4'>
                                            <input
                                                id='apple'
                                                type='checkbox'
                                                value=''
                                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                                                onClick={() => setTech({ ...tech, apple: !tech.apple })}
                                            />
                                            <label htmlFor='apple' className='ms-2 text-sm font-medium text-gray-900 '>
                                                Apple
                                            </label>
                                        </div>
                                        <div className='flex items-center mb-4'>
                                            <input
                                                id='android'
                                                type='checkbox'
                                                value=''
                                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                                                onClick={() => setTech({ ...tech, android: !tech.android })}
                                            />
                                            <label htmlFor='android' className='ms-2 text-sm font-medium text-gray-900 '>
                                                Android
                                            </label>
                                        </div>
                                        <div className='flex items-center mb-4'>
                                            <input
                                                id='windows'
                                                type='checkbox'
                                                value=''
                                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                                                onClick={() => setTech({ ...tech, windows: !tech.windows })}
                                            />
                                            <label htmlFor='windows' className='ms-2 text-sm font-medium text-gray-900 '>
                                                Windows
                                            </label>
                                        </div>
                                    </div>
                                </FormControl>
                                {/* Date */}
                                <FormControl isInvalid={errors.date}>
                                    <FormLabel htmlFor='date'>Date</FormLabel>
                                    <Input placeholder='Date' size='md' type='date' {...register('date')} />
                                    <FormErrorMessage>{errors.date && errors.date.message}</FormErrorMessage>
                                </FormControl>
                                {/* Date */}
                                <FormControl isInvalid={errors.progress}>
                                    <FormLabel htmlFor='progress'>Progress</FormLabel>
                                    <NumberInput value={random} {...register('progress')}>
                                        <NumberInputField />
                                    </NumberInput>
                                    <FormErrorMessage>{errors.progress && errors.progress.message}</FormErrorMessage>
                                    <Button className='mt-2' onClick={() => handleRandom()}>
                                        Random
                                    </Button>
                                </FormControl>
                            </div>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost' onClick={handleSubmit(onSubmit)}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Development
