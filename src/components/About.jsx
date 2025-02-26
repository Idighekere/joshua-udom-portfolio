/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars

import React from 'react'

const Tools = ["CorelDraw"]
const About = () => {
    return (
        <section id="about-me" className='pt-24 max-h-auto'>

            <div>
                <h2 className='text-3xl font-[500] mb-10 border-b-4 inline-block border-primary-500'>ABOUT ME</h2>
                <div className="flex flex-col w-full gap-4 md:flex-row">
                    <div className="p-5 duration-150 border-2 rounded-md cursor-pointer dshadow-md hover:bg-primary-500 border-primary-400/40" data-aos="fade-right">
                        <p className='text-xl text-justivfy' >I'm Joshua, a graphic designer in Nigeria with 2+ year of experience. I specialize in creating functional designs that will help communicate a brand's service or product to it's target audience</p>
                    </div>
                    <div className="p-5 duration-150 border-2 rounded-md cursor-pointer dshadow-md border-primary-400/40 w-a1/2 hover:bg-primary-500" data-aos="fade-left">

                        <p className="text-xl" >Having a keen eye for aesthetics, I make sure that every Design I create is not only aesthetically pleasing but is also a functional design.</p></div></div>
                <h3 className='mt-4 mb-2 text-2xl'>🛠️Tools:</h3>
                <div className="p-2"><p className=''>{Tools.map(t => <span className='px-4 py-2 mr-3 duration-150 border rounded-full cursor-pointer border-primary-500/30 hover:bg-primary-400/80 hover:text-white drop-shadow-lg' key={t}>{t}</span>)}</p></div>
            </div>
        </section >
    )
}

export default About
