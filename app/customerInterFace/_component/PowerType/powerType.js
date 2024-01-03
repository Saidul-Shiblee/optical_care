'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useFormContext } from '@/app/context/FormContext'
import { BsFillInfoCircleFill } from "react-icons/bs";
import Image from 'next/image'
import PVB from '../../../../public/pvb.png'
import { lang } from '@/utils/lang'



const PowerType = () => {
  const { state, handleChange } = useFormContext();
  return (
    <div className>
      <h3 className='mb-4 font-semibold text-3xl'>{lang?.[state.lang.value]?.lensType?.title}:</h3> 
      < RadioGroup defaultValue={'Bifocal'} onValueChange={(value) => handleChange('powerType',value)}  >
       <div className="flex items-center space-x-2">
          <RadioGroupItem value={"Bifocal"} id={'bifocal'} />
            <Label className='text-lxl' htmlFor={'bifocal'}>Bifocal</Label>


          <Dialog>
            <DialogTrigger><BsFillInfoCircleFill className='w-4 h-4 ' /></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Difference between bifocal and progressive glasess</DialogTitle>
                <DialogDescription className="flex justify-center items-center pt-10">


                  <Image width={350} height={178} src={PVB} className='object-cover' />


                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={"Progressive"} id={'progressive'} />
          <Label className='text-lxl' htmlFor={'progressive'}>Progressive</Label> 

          <Dialog>
            <DialogTrigger><BsFillInfoCircleFill className='w-4 h-4 '/></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Difference between bifocal and progressive glasess</DialogTitle>
                <DialogDescription className="flex justify-center items-center pt-10">
                

                    <Image width={350} height={178} src={PVB} className='object-cover'/>

       
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          
        </div>
      </RadioGroup >
    </div>
  )
}

export default PowerType