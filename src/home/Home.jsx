import React, { useEffect, useState } from 'react'
import home from './home.module.css'
import { useFirebase } from '../firebase/Connection'
import { useNavigate } from 'react-router-dom'
import Navbar from '../component/Navbar'
const Home = () => {
    let firebase = useFirebase()
    let navigate = useNavigate()

    let [displayImageUrl,setDisplayImageUrl] = useState([])
    let handleImage = async (image) => {
        let file  = image;
        firebase.imageHandle(file)
        alert('refresh page')
    }
    
    let displayImage = async () => {
        try {
            let data =await firebase.fetchImage()
            setDisplayImageUrl(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        let user = localStorage.getItem('users')
        if (!user) {
            return navigate('/login')
        }else{
            navigate('/')
        }
    },[])

    useEffect(()=>{
        displayImage()
    },[])

    let gallery = () => {
        if (displayImageUrl == 0) {
           return navigate('/')
        }
        navigate('/gallery')
    }


  return (
    <>
            <Navbar/>
        <div className={home.container}>
            <div>
                <input type="file" accept='image/*' onChange={(e)=>handleImage(e.target.files[0])} name="" id="" />
            </div>
                <div onClick={gallery} className={home.previewContainer} >
                    {
                        displayImageUrl != 0 ? (
                        <img src={displayImageUrl[0]} alt="" /> )
                        : <h1> empty </h1>
                    }
                </div>      
        </div>
    </>
  )
}

export default Home

