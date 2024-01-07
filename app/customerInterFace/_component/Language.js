'use client'

import { useFormContext } from '@/app/context/FormContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'
import Logo from '../../../../public/logo.png';
const Language = () => {

    const { state, handleChange } = useFormContext();

    const handleLanguage = (lang) => {
        handleChange("step", state.step + 1)
        handleChange('lang', lang)
    }



    return (

        <div className='flex py-12 px-4 sm:px-12 justify-center rounded-lg flex-col items-center'>

            <div className='w-12 h-12 relative overflow-hidden'>
                <Image src={Logo} alt="logo" fill className='absolute rounded-full ' />
            </div>
            <h2 className='mb-10 mt-4 text-xl lg:text-2xl text-center md:text-center lg:text-start font-bold uppercase'>Welcome to Optical Care</h2>

            <h3 className='text-2xl font mb-2'>Please select your language</h3>
            <h3 className='text-4xl' dir='rtl'>الرجاء اختيار لغتك</h3>
            <div className='flex gap-4 mt-10 ' >
                <Button className=" text-white text-lg px-6 py-4" onClick={() => handleLanguage("en")}>English</Button>
                <Button className="text-white text-lg px-6 py-4" onClick={() => handleLanguage("ar")}>عربي</Button>
            </div>
        </div>

    )
}

export default Language