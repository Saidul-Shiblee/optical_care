'use client'

import React, { useEffect, useState } from 'react'

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useFormContext } from '@/app/context/FormContext'
import { lang } from '@/utils/lang'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const Lens = () => {
const { state, handleChange, lensType,dispatch } = useFormContext();



useEffect(()=> handleChange('lensType', lensType?.[0]?._id),[])



  return (
    <div>     
      <h3 className='mb-4 font-semibold text-3xl'>{lang?.[state.lang.value]?.lensType?.title}:</h3> 
      < RadioGroup dir={state.lang.value === "ar" ? 'rtl' : 'ltr'} defaultValue={lensType?.[0]?._id} onValueChange={(value) => handleChange('lensType',value)} >
                  {
          (state.ladd.value > 0 || state.radd.value > 0) ? 
          
            lensType.filter(el => el?.lensName !== 'Tented' && el?.lensName !== 'Blue Cut').map(el =>   <div className="flex items-center space-x-2 ">
              <RadioGroupItem value={el?._id} id={el?._id} className={state.lang.value === "ar" ? 'ml-2 ' : ''} />
              <Label className="text-xl" htmlFor={el?._id}>{lang?.[state.lang.value]?.lensType?.[el?.lensName]  }</Label>
              <Dialog>
                <DialogTrigger><BsFillInfoCircleFill className='w-4 h-4 ' /></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>About {lang?.[state.lang.value]?.lensType?.[el?.lensName]} lens </DialogTitle>
                    <DialogDescription className="flex justify-center items-center pt-10">


                      {/* <Image width={350} height={178} src={PVB} className='object-cover' /> */}


                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          ) 
          : 
          
         

          lensType.map(el => <div className="flex items-center space-x-2 ">
            <RadioGroupItem value={el?._id} id={el?._id} className={state.lang.value === "ar" ? 'ml-2 ' : ''} />
            <Label className="text-xl" htmlFor={el?._id}>{lang?.[state.lang.value]?.lensType?.[el?.lensName]}</Label>
            <Dialog>
              <DialogTrigger><BsFillInfoCircleFill className='w-4 h-4 ' /></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>About {lang?.[state.lang.value]?.lensType?.[el?.lensName]} lens </DialogTitle>
                  <DialogDescription className="flex justify-center items-center pt-10">


                    {/* <Image width={350} height={178} src={PVB} className='object-cover' /> */}


                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
        </div>
          
          )
                  }
        </RadioGroup >   
    </div>)
  
}

export default Lens