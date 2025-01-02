/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Lightbox from "yet-another-react-lightbox";

const Design = ({ design,filteredDesigns }) => {

    // const [open, setOpen] = useState(false)
    // const [index, setIndex] = useState(0)

    // const handleOpen = (i) => {
    //     setIndex(i);
    //     setOpen(true);
    // }
    // console.log(index)
    // console.log(design.id)
        const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(0)

    const handleOpen = (i) => {
        setIndex(i);
        setOpen(true);
    }

    return (
        <div >
            <div className="flex grid-gap- max-h-[500px]">
                <LazyLoadImage
                    key={design.id}
                    index={design.id}
                    src={design.src}
                    alt={design.name}
                    className="h-auto border-2 rounded-lg cursor-pointer max-w-auto max-h-auto hover:drop-shadow-md border-bg-primary-500/50"
                    effect="opacity"
                    loading="lazy"
                    data-aos="zoom-in"
                    // height={260}
                    onClick={() => handleOpen(design.id)}

                />
            </div>
            {open && (<Lightbox open={open} close={() => setOpen(false)} slides={filteredDesigns} index={design.id} />)}

        </div >
    );
};

export default Design;
