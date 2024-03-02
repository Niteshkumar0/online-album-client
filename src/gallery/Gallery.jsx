import React, { useEffect, useState } from 'react'
import { useFirebase } from '../firebase/Connection'
import gallery from './gallery.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../component/Navbar'
const Gallery = () => {
    let firebase = useFirebase()

    let [images,displayImages] = useState([])

    let fetchImage = async () => {
        let data =await firebase.fetchImage()
        displayImages(data)
    }

    useEffect(()=>{
        fetchImage()
        fullPic()
    },[])

    let fullPic = (image) => {
        console.log(image)
    }


  return (
    <>
    <Navbar/>
    <div className={gallery.container}>
        {images?.map((image,index)=>(
            <div className={gallery.imageContainer} key={index}>
                <Link to={`/gallery/${encodeURIComponent(image)}`}>
                    <img src={image} alt="images" />
                </Link>
            </div>
        ))}
    </div>
        </>
  )
}

export default Gallery