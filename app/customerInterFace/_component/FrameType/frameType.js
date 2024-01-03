'use client'

import React, { useState } from 'react'

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useFormContext } from '@/app/context/FormContext'
import { lang } from '@/utils/lang'

const FrameType = () => {
  const { state, handleChange } = useFormContext();
  return (
    <div>
      <h3 className='mb-4 text-3xl font-semibold'>{lang?.[state.lang.value]?.frameType?.['title']}</h3>
      < RadioGroup RadioGroup dir={state.lang.value === "ar" ? 'rtl' : 'ltr'} defaultValue={state.frameType.value} onValueChange={(value) => handleChange('frameType',value)}  >
       <div className="flex items-center space-x-2 ">
          <RadioGroupItem value={false} id={'no'} className={state.lang.value === "ar" ? 'ml-2 ' : ''  }/>
          <Label className="text-xl" htmlFor={'no'}> {lang?.[state.lang.value]?.frameType?.['No']}</Label>
        </div>
        <div className="flex items-center space-x-2 ">
          <RadioGroupItem value={true} id={'yes'} className={state.lang.value === "ar" ? 'ml-2 ' : ''} />
          <Label className="text-xl" htmlFor={'yes'}>{lang?.[state.lang.value]?.frameType?.['Yes']}</Label>
        </div>
      </RadioGroup >
    </div>
  )
}

export default FrameType