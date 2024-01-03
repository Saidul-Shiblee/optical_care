'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import Power from './_component/power'
import LensType from './_component/LensType/lensType'
import Frame from './_component/FrameType/frameType'
import { useFormContext } from '../context/FormContext'
import MultiStepForm from './_component/MultiStepForm'
import Form from './_component/Form'

const page = () => {
  const { state, handleChange, dispatch } = useFormContext();

  return (
    <div className='h-screen w-full flex flex-col justify-center items-center '>
    <Form/>

    </div>
  )
}

export default page