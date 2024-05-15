import { useRoutes } from 'react-router-dom'
import MainLayouts from '../layouts/MainLayouts'
import Home from '../pages/home'

export default function MainRouter() {
    let element = useRoutes([
        {
            path: '/',
            element: <MainLayouts />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
            ],
        },
    ])
    return element
}
