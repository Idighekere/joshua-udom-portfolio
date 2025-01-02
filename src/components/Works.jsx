/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'
// import { designLists } from "../utils/designs"
import Design from './Design'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"
import TabButton from './TabButton';
import axios from 'axios';


const tabButtons = [
    {

        name: "Flyer Designs",
        category: "flyer"

    },
    {

        name: "Church Designs",
        category: "church"
    },

    {

        name: "Social Media Designs",
        category: "social"

    },
]

const Works = () => {
    const [selectedCategory, setSelectedCategory] = useState("flyer")
    const [activeTab, setactiveTab] = useState("0")
    const [designs, setDesigns] = useState([])
    const [loading, setLoading] = useState(true)
    // console.log(designs.map(d => d.name))
    // console.log(designs.category[0].name)
    const handleCategory = (cat) => {
        setSelectedCategory(cat)
    }

    const fetchDesigns= useMemo(async()=>{

        try {
            setLoading(true)
            const response = await axios.get("/designs.json")
            setDesigns(response.data)
                  sessionStorage.setItem(selectedCategory, JSON.stringify(response.data)) // Update sessionStorage with filtered designs

            // console.log(response.data)
        } catch (error) {
            console.error(error)
        } finally{
            setLoading(false)
        }

    },[selectedCategory])
    useEffect(() => {

          const cachedDesigns = sessionStorage.getItem(selectedCategory);

  if (cachedDesigns) {
    const parsedDesigns = JSON.parse(cachedDesigns);
    setLoading(false);
    setDesigns(parsedDesigns)

    return;
  }

       fetchDesigns()

    }, [selectedCategory,fetchDesigns])


    const filteredDesigns = designs.filter(d => d.category === selectedCategory)
    // const filteredDesigns = selectedCategory === "" ? designs : designs.filter(d => d.category === selectedCategory)
    // const filteredDesigns = desi.filter(des => des.category === designs.category)


    //    useEffect(()=>{

    //     const timeout=setTimeout(()=>{
    //         setLoading(false)
    //     },5000)

    //     return ()=>{
    //         clearTimeout(timeout)
    //     }
    // },[selectedCategory])

    // if (loading){
    //     return <div className='flex items-center justify-center h-screen'><LoadingSpinner/></div>
    // }
    return (
        <section id="works" className='pt-24 overflow-x-hidden max-h-auto'>
            <h2 className='text-3xl font-[500] mb-4c text-uppercase mb-10 border-b-4 inline-block border-primary-500'>MY WORKS</h2>

            <div className="flex justify-center w-full overflow-x-hidden /gap-3 whitespace-nowrap ">
                <div className="overflow-x-auto /rounded-s-full //rounded-e-full //bg-primary-400/30 whitespace-nowrap //hover:bg-primary-500">{tabButtons.map(button => (<TabButton key={button.name} selectedCategory={selectedCategory} handleCategory={handleCategory} name={button.name} category={button.category} />))}

                </div>
            </div>
            <div className='grid //gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4c w-full justify-center items-center //gap-x-10 grid-rows-[auto] mt-4' style={{ gridGap: "20px" }}>
                {loading ? (<p className='text-center'>Loading...</p>) : (
                    filteredDesigns.map(design => {
                        return <Design design={design} key={design.id}  filteredDesigns={filteredDesigns}/>
                    })
                )}

            </div>

        </section >
    )
}

export default Works
