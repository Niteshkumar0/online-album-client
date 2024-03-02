import React, { useState } from 'react'
import { createContext,useContext } from 'react'

let PicContext = createContext()
export let usePicContext = () => useContext(PicContext)

const PicLinkContext = ({children}) => {
    let [picLink,setPicLink] = useState()
  return (
    <>
    <PicContext.Provider value={{
        picLink,
        setPicLink
    }}>
        {children}
    </PicContext.Provider>
    </>
  )
}

export default PicLinkContext