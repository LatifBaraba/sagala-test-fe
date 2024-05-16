import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { User } from 'lucide-react'
import { Lock, X } from 'lucide-react'
import { BarChart2 } from 'lucide-react'
import { Home } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useStoreSidebar } from '../store/sidebar'

const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { active, setActive } = useStoreSidebar()

    const listMenu = [
        {
            title: 'Main Dashboard',
            path: '/',
            logo: <Home className='w-5' />,
        },
        {
            title: 'NFT Marketplace',
            path: '/nft',
            logo: <ShoppingCart className='w-5' />,
        },
        {
            title: 'Data Tables',
            path: '/data',
            logo: <BarChart2 className='w-5' />,
        },
        {
            title: 'Profile',
            path: '/profile',
            logo: <User className='w-5' />,
        },
        {
            title: 'Sign In',
            path: '/signin',
            logo: <Lock className='w-5' />,
        },
        {
            title: 'RTL Admin',
            path: '/rtl-admin',
            logo: <Home className='w-5' />,
        },
    ]

    return (
        <div
            className={`bg-white h-full md:min-h-full z-20 w-[300px] p-6 md:flex flex-col gap-4 ${
                active ? 'translate-x-0' : '-translate-x-full'
            } fixed md:translate-x-0 transition ease-in delay-100`}
        >
            <div className='cursor-pointer md:hidden' onClick={() => setActive()}>
                <X className='absolute top-3 right-3' />
            </div>
            {/* Header */}
            <div className='header h-[120px] mb-6 border-b-2 border-[#dbdceb] flex text-center align-middle'>
                <div className='text-center m-auto'>
                    <h1 className='text-[24px] font-medium'>
                        <b>HORIZON</b> FREE
                    </h1>
                </div>
            </div>
            {/* Nav */}
            <div className='nav h-[80%] flex flex-col gap-3 text-[#8f9bba]'>
                {listMenu.map((item, idx) => (
                    <div key={idx} className='flex justify-between content-end'>
                        <div
                            className={`flex ml-6 py-2 gap-4 cursor-pointer w-full hover:bg-gray-100 rounded-lg transition ease-in delay-100`}
                            onClick={() => navigate(item.path)}
                        >
                            {item.logo}
                            <span
                                className={`content-end text-sm ${location.pathname == item.path ? 'font-bold text-black' : 'font-normal'}`}
                            >
                                {item.title}
                            </span>
                        </div>
                        <div
                            className={`w-1 min-h-full rounded transition ease-in delay-200 ${
                                location.pathname == item.path ? 'bg-[#422afb]' : 'bg-transparent'
                            }`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
