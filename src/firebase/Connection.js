import {initializeApp} from 'firebase/app'
import {getStorage,uploadBytes,ref, getDownloadURL} from 'firebase/storage'
import { createContext,useContext, useEffect, useState } from 'react';
import axios from 'axios'
const firebaseConfig = {
    apiKey: "AIzaSyATB7QdvG9iWLspiqL_eMMRDMyyPGntWS4",
    authDomain: "image-upload-9d942.firebaseapp.com",
    projectId: "image-upload-9d942",
    storageBucket: "image-upload-9d942.appspot.com",
    messagingSenderId: "825735941885",
    appId: "1:825735941885:web:4da0b005181c9cce2b7894",
    measurementId: "G-Y6FYQJ7L2R"
};


let FirebaseContext = createContext(null);
let app = initializeApp(firebaseConfig);
let storage = getStorage(app)

export let useFirebase = () => useContext(FirebaseContext)

let imageHandle = async (image) => {
    let getUser = await JSON.parse(localStorage.getItem('users'))    
    let imageRef = ref(storage,`uploads/images/${image.name}`)
    let uploadImage = await uploadBytes(imageRef,image)
    await axios.post('http://localhost:3001/imagePath',{
        email:getUser.email,
        imagePath:uploadImage.ref.fullPath
    }).then((data)=>console.log(data))
}

let specificImage = async (url) => {
    try {
        let imageRef = ref(storage,`${url}`);
        let downloadImage = await getDownloadURL(imageRef)
        return downloadImage
    } catch (error) {
        console.error('error getting download')
    }
}


export let FirebaseProvider = (props)=>{
    let fetchImage = async () => {
           let getUser = await JSON.parse(localStorage.getItem('users'))   
           let user = await axios.get(`http://localhost:3001/fetchImagePath?email=${getUser.email}`)
         let urlsPromises = user.data.user.imagePath?.map(async(imagePath)=>{
            // console.log(imagePath)
            let storageRef = ref(storage,imagePath);
            return await getDownloadURL(storageRef)
          })

        let urls = await Promise.all(urlsPromises);
          return urls
    }

    return <FirebaseContext.Provider value={{
        imageHandle,
        fetchImage,
        specificImage
    }}>
        {props.children}
    </FirebaseContext.Provider>
}

