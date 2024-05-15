import React from 'react'
import Breadcrumbs from './pages/Breadcrumb'
import { useLocation } from 'react-router-dom'
import { Input } from '@chakra-ui/react'
import { PhoneCall } from 'lucide-react'
import { CircleAlert } from 'lucide-react'
import { Palette } from 'lucide-react'
import { AlignJustify } from 'lucide-react'
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useStoreSidebar } from '../store/sidebar'

const Header = () => {
    const location = useLocation()
    const [scrollActive, setScrollActive] = useState(false)
    const { active, setActive } = useStoreSidebar()

    const listenScrollEvent = () => {
        window.scrollY > 10 ? setScrollActive(true) : setScrollActive(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent)
        return () => {
            window.removeEventListener('scroll', listenScrollEvent)
        }
    }, [])

    return (
        <div className={`sticky top-10 left-10 z-10 ${scrollActive && 'backdrop-blur-lg bg-white/30 shadow-sm'} rounded-xl transition ease-in delay-75`}>
            <div className='flex flex-col md:flex-row w-full relative justify-between p-3 gap-3'>
                {/* Left */}
                <div className='flex flex-col gap-2'>
                    {/* Bread */}
                    <Breadcrumbs />
                    {/* Page Title */}
                    <h2 className='text-4xl font-semibold'>Data Tables</h2>
                </div>
                {/* Search */}
                <div className='flex items-center bg-white px-2 py-2 rounded-full gap-2 shadow-xl p-[10px]'>
                    <input className='bg-[#f3f6fd] border-transparent grow rounded-full m-1 p-3 text-sm' placeholder='Search' />
                    <div className='flex gap-3'>
                        <AlignJustify className={`w-4 text-[#a0aec0] cursor-pointer block md:hidden`} onClick={() => setActive()}/>
                        <PhoneCall className='w-4 text-[#a0aec0] cursor-pointer' />
                        <CircleAlert className='w-4 text-[#a0aec0] cursor-pointer' />
                        <Palette className='w-4 text-[#a0aec0] cursor-pointer' />
                    </div>
                    {/* Ava */}
                    <Menu>
                        <MenuButton>
                            <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                        </MenuButton>
                        <MenuList>
                            <MenuItem command='⌘T'>New Tab</MenuItem>
                            <MenuItem command='⌘N'>New Window</MenuItem>
                            <MenuItem command='⌘⇧N'>Open Closed Tab</MenuItem>
                            <MenuItem command='⌘O'>Open File...</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default Header
