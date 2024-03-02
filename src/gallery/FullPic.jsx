import React, { useEffect, useState, useRef } from 'react';
import fullpic from './fullPic.module.css';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../firebase/Connection';
import Navbar from '../component/Navbar'
// import {QRCode} from 'qrcode';
// import {QRCode} from 'qrcode'
import Qrcode from 'qrcode'
const FullPic = () => {
  let firebase = useFirebase();
  let { id } = useParams();
  let [imageUrl, setImageUrl] = useState();
  let [visible, setVisible] = useState(false);
  let [qrcodeImage,setQrcodeImage] = useState()
  const qrCodeRef = useRef();

  let fetchSpecificImage = async () => {
    try {
      let image = await firebase.specificImage(id);
      setImageUrl(image);
    } catch (error) {
      console.error('Error fetching specific image:', error);
    }
  };

  let generateQrCode = async () => {
      try {
        let response = await Qrcode.toDataURL(imageUrl)
        setQrcodeImage(response)
        setVisible(true)
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(() => {
    fetchSpecificImage();
  }, []);

  return (
    <>
    <Navbar/>
    <div className={fullpic.container}>
      <div className={fullpic.pic}>
        {imageUrl && <img src={imageUrl} alt="img" />}
      </div>
      <div className={fullpic.innerContainer}>
      <button onClick={() => generateQrCode()  }>
        Generate QR Code
      </button>

      {visible && (
        <>
        <p>
        click qrcode for download

        </p>
        <div className={fullpic.qrcode}>
        
          <a href={qrcodeImage} download>
          <img src={qrcodeImage}/>
          </a>
        </div>
        </>
      )}
      </div>
    </div>
      </>
  );
};

export default FullPic;
