/* eslint-disable no-unused-vars */
import React, { useEffect,useState } from 'react'
import {About,Contact,Footer,Works,Header,Hero,LoadingSpinner} from '../components'
import AOS from 'aos';
import 'aos/dist/aos.css';


const Home = () => {

    const [loading, setLoading]=useState(true)

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: false, // Whether animation should happen only once
        });
    }, []);

    useEffect(()=>{

        const timeout=setTimeout(()=>{
            setLoading(false)
        },4000)

        return ()=>{
            clearTimeout(timeout)
        }
    },[])

    if (loading){
        return <div className='flex items-center justify-center h-screen'><LoadingSpinner/></div>
    }

    const aosType = "fade-up";
    const aosDuration = 1000;
    return (
        <div className="flex flex-col justify-center px-10 text-white bg-black sm:px-16 lg:px-32 ">

            <Header />
            <div className="overflow-x-hidden" >
                <Hero aosType={aosType} aosDuration={aosDuration} />
                <Works />
                <About />
                <Contact />
            </div>
            <Footer />
        </div>
    )
}

export default Home
