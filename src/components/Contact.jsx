/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars

import React from 'react'
import { Link } from 'react-router-dom'

const socialLinks = [
    {
        name: "Facebook",
        link: "https://facebook.com/profile.php?id=61558207507000",
        color: "hover:bg-[#1877F2]",
        icon: "/facebook.svg"
    },
    {
        name: "Whatsapp",
        link: "https://wa.me/+2348171012904",
        color: "hover:bg-[#25D366]",


        icon: "/whatsapp.svg"
    },
    {
        name: "Phone Call",
        link: "+2348171012904",
        color: "hover:bg-[#34b7f1]",
        icon: "/call.svg",
        aos: ""
    },
    {
        name: "Send Mail",
        link: "mailto:udomjosh04@gmail.com",
        color: "hover:bg-[#d44638]", icon: "/mail.svg"
    },
]
const Contact = () => {
    return (
        <section id="contact-me" className='pt-20 max-h-auto'>
            <h2 className='text-3xl font-[500] mbs-4 text-uppercase mb-10 border-b-4 inline-block border-primary-500'>CONTACT ME</h2>
            <p className='text-xl text-center' data-aos="fade-left">Get in touch with me for your design projects, brand consultation or just to say hello😃.</p>

            <div className='grid items-center justify-center grid-cols-1 gap-3 grid-rowss-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 py-7' >
                {
                    socialLinks.map(link => (<span key={link.name} className='flex justify-center'><Link to={link.link} className={`flex gap-3 justify-around items-center border-2 border-white/90 rounded-full mr-3 w-auto sm:w-[12rem] h-auto sm:h-[4rem] px-2 py-2 md:px-4 md:py-1 /hover:bg-white/80  drop-shadow-lg ${link.color} `} data-aos="zoom-out" target='_blank'>
                        <img src={link.icon} alt={link.name} width="10px" className='w-10' /> <p className='hiddenz md:block'>{link.name}</p></Link>
                    </span>))
                }
            </div>


        </section >
    )
}

export default Contact
