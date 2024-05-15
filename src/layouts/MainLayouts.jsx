import React, { useState } from 'react'
import Sidebar from '../components/sidebar'
import { Outlet } from 'react-router-dom'
import PageLayouts from './PageLayouts'

const MainLayouts = () => {

    const [activeSidebar, setActiveSidebar] = useState(false)
    
    return (
        <div className='w-full min-h-full flex flex-row bg-[#f4f8fe]'>
            <Sidebar />
            <Outlet/>
        </div>
    )
}

export default MainLayouts
