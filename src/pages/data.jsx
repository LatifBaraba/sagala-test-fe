import React from 'react'
import Development from '../components/pages/data/development'
import Check from '../components/pages/data/check'

const Data = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <Development />
            <Check />
            <Development />
            <Development />
        </div>
    )
}

export default Data
