import React from 'react'
import Header from '../components/header'
import { Outlet } from 'react-router-dom'
import { useStoreSidebar } from '../store/sidebar'

const PageLayouts = () => {
    const { active } = useStoreSidebar()

    return (
        <div className={`w-full relative mb-5 md:ml-[300px] flex flex-col gap-10 px-[20px] md:p-[30px]`}>
            <Header />
            <Outlet/>
        </div>
    )
}

export default PageLayouts
