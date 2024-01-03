'use client'

import { useFormContext } from '@/app/context/FormContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { lang } from '@/utils/lang'
import React, { useState } from 'react'


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { generateArray } from '@/utils/generateArray'

const Power = () => {
    const { state, handleChange, resetError } = useFormContext();
  
  return (
    <div dir='' >
          <h3 className='mb-4 font-semibold text-3xl'>{lang?.[state.lang.value]?.powerDetails?.['title']}</h3>
        <div className='flex'>
              <div className='w-[85px] md:w-[100px] xl:w-[120px] border-[1px] flex justify-center items-center px-4 py-2  font-semibold'>Eye</div>
              <div className='w-[85px] md:w-[100px] xl:w-[120px] border-[1px] flex justify-center items-center px-4 py-2 font-semibold'>Spherical</div>
              <div className='w-[85px] md:w-[100px] xl:w-[120px] border-[1px] flex justify-center items-center px-4 py-2 font-semibold'>Cylindrical</div>
              <div className='w-[85px] md:w-[100px] xl:w-[120px] border-[1px] flex justify-center items-center px-4 py-2 font-semibold'>Add</div>
        </div>
   
          <div className='flex'>
              <div className='w-[85px] md:w-[100px] xl:w-[120px] border-[1px] flex justify-center items-center px-4 py-2 font-semibold'>
               Right
              </div>
              <div className={`w-[85px] md:w-[100px] xl:w-[120px]  flex justify-center items-center ${state.rs.error ? "border border-red-700" : 'border'}`}>


                  <Select dir='ltr' className='' value={state.rs.value} onValueChange={(value) => handleChange('rs', value)}>
                      <SelectTrigger className={`focus:ring-0 border-none focus:ring-offset-0 w-[90%] `}	 >
                          <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent className='w-[90%]'>
                          <SelectGroup>
                              {
                                  generateArray(-8, 8, 0.25).map(el => <SelectItem key={el} value={el}>{el}</SelectItem>)
                              }
                          </SelectGroup>

                      </SelectContent>
                  </Select>


                  {/* <input
                  dir='ltr' 
                     
                    value={state.rs.value}
                    onFocus={(e) => resetError(e.target.name)}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    name='rs'
                    placeholder={state.rs.error ? state.rs.error : "e.g -1.25"}
                  
                  
                  className=    {`w-full px-4 py-2     placeholder:text-xs   hover:bg-[#f1f5f9] focus:bg-[#f1f5f9]
                                 focus:border-[0px] !border-[0px] focus:outline-none ${!state.rs.error ? "placeholder:text-gray-400" :"placeholder:text-red-600"}`}/> */}
              </div>
              <div className='w-[85px] md:w-[100px] xl:w-[120px] border flex justify-center items-center'>


























                  <Select dir='ltr' className='' value={state.rc.value} onValueChange={(value) => handleChange('rc', value)}>
                      <SelectTrigger className="focus:ring-0 border-none focus:ring-offset-0 w-[90%]	 ">
                          <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent className='w-[90%]'>
                          <SelectGroup>
                             {
                                  generateArray(-4,0,0.25).map(el => <SelectItem key={el}  value={el}>{el}</SelectItem>)
                             }
                          </SelectGroup>
                       
                      </SelectContent>
                  </Select>









                  {/* <input
                  dir='ltr'
                      name='rc'
                      value={state.rc.value}
                      onFocus={(e) => resetError(e.target.name)}
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                  
                  className='w-full px-4 py-2    placeholder:text-xs placeholder:text-gray-400  hover:bg-[#f1f5f9] focus:bg-[#f1f5f9]
                                focus:border-black focus:border-[1px] border-[1px] focus:outline-none ' /> */}
              </div>
              <div className='w-[85px] md:w-[100px] xl:w-[120px] border flex justify-center items-center'>


                  <Select dir='ltr' className='' value={state.radd.value} onValueChange={(value) => handleChange('radd', value)}>
                      <SelectTrigger className="focus:ring-0 border-none focus:ring-offset-0 w-[90%]	 ">
                          <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent className='w-[90%]'>
                          <SelectGroup>
                              {
                                  generateArray(0,3, 0.25).map(el => <SelectItem key={el} value={el}>{el}</SelectItem>)
                              }
                          </SelectGroup>

                      </SelectContent>
                  </Select>
                  {/* <input
                  dir='ltr' 
                      name='radd'
                      value={state.radd.value}
        
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className='w-full px-4 py-2    placeholder:text-xs placeholder:text-gray-400  hover:bg-[#f1f5f9] focus:bg-[#f1f5f9]
                                focus:border-black focus:border-[1px] border-[1px] focus:outline-none ' /> */}
              </div>
          </div>
          <div className='flex'>
              <div className='w-[85px] md:w-[100px] xl:w-[120px] border-[1px] flex justify-center items-center px-4 py-2 font-semibold'>
                  Left
              </div>
              <div className={`w-[85px] md:w-[100px] xl:w-[120px]  flex justify-center items-center ${state.ls.error ? "border border-red-700" : 'border'}`}>
                  <Select dir='ltr' className='' value={state.ls.value} onValueChange={(value) => handleChange('ls', value)}>
                      <SelectTrigger className="focus:ring-0 border-none focus:ring-offset-0 w-[90%]	 ">
                          <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent className='w-[90%]'>
                          <SelectGroup>
                              {
                                  generateArray(-8, 8, 0.25).map(el => <SelectItem key={el} value={el}>{el}</SelectItem>)
                              }
                          </SelectGroup>

                      </SelectContent>
                  </Select>
                  
              </div>
              <div className='w-[85px] md:w-[100px] xl:w-[120px] border flex justify-center items-center'>

                  <Select dir='ltr' className='' value={state.lc.value} onValueChange={(value) => handleChange('lc', value)}>
                      <SelectTrigger className="focus:ring-0 border-none focus:ring-offset-0 w-[90%]	 ">
                          <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent className='w-[90%]'>
                          <SelectGroup>
                              {
                                  generateArray(-4, 0, 0.25).map(el => <SelectItem key={el} value={el}>{el}</SelectItem>)
                              }
                          </SelectGroup>

                      </SelectContent>
                  </Select>
              </div>
              <div className='w-[85px] md:w-[100px] xl:w-[120px] border flex justify-center items-center '>
                  <Select dir='ltr' className='' value={state.ladd.value} onValueChange={(value) => handleChange('ladd', value)}>
                      <SelectTrigger className="focus:ring-0 border-none focus:ring-offset-0 w-[90%]	 ">
                          <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent className='w-[90%]'>
                          <SelectGroup>
                              {
                                  generateArray(0, 3, 0.25).map(el => <SelectItem key={el} value={el}>{el}</SelectItem>)
                              }
                          </SelectGroup>

                      </SelectContent>
                  </Select>
              </div>
          </div>


         
         
       
    </div>
  )
}

export default Power