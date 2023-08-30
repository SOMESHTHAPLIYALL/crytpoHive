import React from 'react'
import {ImSpinner10} from "react-icons/im"

const Loader = () => {
  return (
    <>
    <div className='spinner flex justify-center items-center h-[80vh]'>
    <ImSpinner10 className='place-self-center animate-spin lg:h-72 lg:w-72 h-40 w-40'
       
        />
    </div>
        
    </>
  )
}

export default Loader