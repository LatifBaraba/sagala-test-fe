import React from 'react'
import Header from '../components/header'
import { Outlet } from 'react-router-dom'
import { useStoreSidebar } from '../store/sidebar'

const PageLayouts = () => {
    const { active } = useStoreSidebar()

    return (
        <div className={`w-full relative ml-0 md:ml-[300px] flex flex-col gap-4 p-[30px]`}>
            <Header />
            <Outlet/>
        </div>
    )
}

export default PageLayouts
