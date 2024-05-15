import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@chakra-ui/react'

const Breadcrumbs = () => {
    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink href='#' className='text-xs leading-6'>Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink href='#' className='text-xs leading-6'>Docs</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}

export default Breadcrumbs
