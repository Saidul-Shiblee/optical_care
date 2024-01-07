'use client'

import React from 'react'
import { useFormContext } from '../context/FormContext'
import Form from './_component/Form'
import Sidebar from './_component/Sidebar'

const Page = () => {
  const { state } = useFormContext();
  return (
    <div className='flex max-w-[1920px] h-screen overflow-y-scroll md:overflow-hidden'>
      
     <div className='w-[35%] hidden lg:block'>
     <Sidebar/>
     </div>


   <div className='w-[100%] lg:w-[65%] flex justify-center items-center flex-col h-full'>
        {!state.result && <div className={`${state.step > 1 && state.step <= 5 ? "block": "hidden"} w-[300px] lg:w-[400px] xl:w-[600px] flex items-center justify-between mt-3`}>
          <div className='w-10 h-10 rounded-full flex justify-center items-center bg-[#080a36]'>
            <p className='text-white font-semibold text-lg'>1</p>
          </div>
          <div className={`w-[calc((100%_-_136px)_/_2)] h-[10px]  rounded-full ${state.step >= 4 ? "bg-[#080a36]" : "bg-gray-300"}`}></div>
          <div className={`w-10 h-10 rounded-full flex justify-center items-center ${state.step >= 4 ? "bg-[#080a36]" : "bg-gray-300"}`} >
            <p className='text-white font-semibold text-lg'>2</p>
          </div>
          <div className={`w-[calc((100%_-_136px)_/_2)] h-[10px]  rounded-full ${state.step >= 5 ? "bg-[#080a36]" : "bg-gray-300"}`}></div>
          <div className={`w-10 h-10 rounded-full flex justify-center items-center ${state.step >= 5 ? "bg-[#080a36]" : "bg-gray-300"}`}>
            <p className='text-white font-semibold text-lg'>3</p>
          </div>
        </div>}
   <Form/>
   </div>

    </div>
  )
}

export default Page