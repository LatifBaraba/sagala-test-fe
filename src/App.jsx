import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import MainLayouts from './layouts/MainLayouts'
import PageLayouts from './layouts/PageLayouts'
import Home from './pages/home'
import Nft from './pages/nft'
import Data from './pages/data'
import Profile from './pages/profile'
import Rtl from './pages/rtl'
import Signin from './pages/signin'

function App() {
    const router = createBrowserRouter([
        {
            element: <MainLayouts />,
            children: [
                {
                    path: '/',
                    element: <PageLayouts />,
                    children: [
                        {
                            index: true,
                            element: <Home />,
                        },
                        {
                            path: '/nft',
                            element: <Nft />,
                        },
                        {
                            path: '/data',
                            element: <Data />,
                        },
                        {
                            path: '/profile',
                            element: <Profile />,
                        },
                        {
                            path: '/signin',
                            element: <Signin />,
                        },
                        {
                            path: '/rtl-admin',
                            element: <Rtl />,
                        },
                    ],
                },
            ],
        },
    ])

    const theme = extendTheme({
        fonts: {
            heading: `'DM Sans', sans-serif`,
            body: `'DM Sans', sans-serif`,
        },
        components: {
            Progress: {
                baseStyle: {
                    filledTrack: {
                        bg: '#422afb',
                    },
                },
            },
        },
    })

    return (
        <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
        </ChakraProvider>
    )
}

export default App
