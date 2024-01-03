'use client'

import { useFormContext } from '@/app/context/FormContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'
import Logo from '../../../../public/logo.png'
const Langaguage = () => {

    const { state, handleChange, dispatch } = useFormContext();

    const handleLanguage=(lang)=>{
        handleChange("step", state.step + 1)
        handleChange('lang', lang)
    }


    
  return (
      <div className='flex flex-col w-[350px] md:w-[410px] xl:w-[480px] items-center'>

          
          <div className='w-12 h-12 relative overflow-hidden'>
              <Image src={Logo} alt="logo" fill className='absolute rounded-full ' />
          </div>
          <h2 className='mb-10 text-2xl font-semibold'>Welcome to Optical Care</h2>
       

          <h3 className='text-2xl font'>Please select your langage</h3>
          <h3 className='text-4xl' dir='rtl'>الرجاء اختيار لغتك</h3>
          <div className='flex gap-4 mt-10 ' >
              <Button className="bg-[#080a36] text-lg px-6 py-4" onClick={() => handleLanguage("en")}>English</Button>
              <Button className="bg-[#080a36] text-lg px-6 py-4" onClick={() => handleLanguage("ar")}>عربي</Button>
          </div>
      </div>
  )
}

export default Langaguage