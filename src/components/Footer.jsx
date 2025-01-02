/* eslint-disable no-unused-vars */
import React from 'react'

const Footer = () => {

    const year=new Date().getFullYear()
    return (
        <footer className='flex justify-center py-10 max-h-32'>
            <hr className='text-white bg-white' />
            <div className='text-center'><p>Joshua © {year} | Developed with ❤️ by <a href='https://idighekereudo.netlify.app/'>Idighekere</a></p> </div>
        </footer>
    )
}

export default Footer
