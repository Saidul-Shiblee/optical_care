'use client'

import { useFormContext } from '@/app/context/FormContext'

import { lang } from '@/utils/lang'
import React from 'react'


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { generateArray } from '@/utils/generateArray'
import { Fade } from 'react-awesome-reveal'

export default function Power {
    const { state, handleChange, resetError } = useFormContext();

    return (
        <>
            <Fade >
                <div className='rounded-[20px]' >
                    <h3 className=' font-semibold px-2 py-6 text-2xl sm:text-3xl'>{lang?.[state.lang.value]?.powerDetails?.['title']}</h3>
                    <div className='flex' dir='ltr'>
                        <div className='w-[60px] sm:w-[98px] border-[1px] flex justify-center items-center px-4 py-2  font-semibold'>Eye</div>
                        <div className='w-[80px] sm:w-[98px] border-[1px] flex justify-center items-center px-4 py-2 font-semibold'>Sphere</div>
                        <div className='w-[80px] sm:w-[98px] border-[1px] flex justify-center items-center px-4 py-2 font-semibold'>Cylinder</div>
                        <div className='w-[60px] sm:w-[98px] border-[1px] flex justify-center items-center px-4 py-2 font-semibold'>Axis</div>
                        <div className='w-[80px] sm:w-[98px] border-[1px] flex justify-center items-center px-4 py-2 font-semibold'>Add</div>
                    </div>

                    <div className='flex' dir='ltr'>
                        <div className='w-[60px] sm:w-[98px] border-[1px] flex justify-center items-center px-4 py-2 font-semibold'>
                            Right
                        </div>
                        <div className={`w-[80px] sm:w-[98px]  flex justify-center items-center ${state.rs.error ? "border border-red-700" : 'border'}`}>


                            <Select dir='ltr' className='' value={state.rs.value} onValueChange={(value) => handleChange('rs', value)}>
                                <SelectTrigger className={`focus:ring-0 border-none focus:ring-offset-0 w-[95%]`}	 >
                                    <SelectValue placeholder="0" />
                                </SelectTrigger>
                                <SelectContent className='h-40'>
                                    <SelectGroup>
                                        {
                                            generateArray(-8, 8, 0.25).map(el => <SelectItem key={el} value={el}>{el}</SelectItem>)
                                        }
                                    </SelectGroup>

                                </SelectContent>
                            </Select>
                        </div>
                        <div className='w-[80px] sm:w-[98px] border flex justify-center items-center'>
                            <Select dir='ltr' className='' value={state.rc.value} onValueChange={(value) => handleChange('rc', value)}>
                                <SelectTrigger className="focus:ring-0 border-none focus:ring-offset-0 w-[95%] ">
                                    <SelectValue placeholder="0" />
                                </SelectTrigger>
                                <SelectContent className='h-40'>
                                    <SelectGroup>
                                        {
                                            generateArray(-4, 0, 0.25).map(el => <SelectItem key={el} value={el}>{el}</SelectItem>)
                                        }
                                    </SelectGroup>

                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <input
                                type='number'
                                className='w-[60px] sm:w-[98px] border flex justify-center items-center p-3 outline-none'
                            />
                        </div>

                        <div className='w-[80px] sm:w-[98px] border flex justify-center items-center'>


                            <Select dir='ltr' className='' value={state.radd.value} onValueChange={(value) => handleChange('radd', value)}>
                                <SelectTrigger className="focus:ring-0 border-none focus:ring-offset-0 w-[95%] ">
                                    <SelectValue placeholder="0" />
                                </SelectTrigger>
                                <SelectContent className='w-[90%] h-40'>
                                    <SelectGroup>
                                        {
                                            generateArray(0, 3, 0.25).map(el => <SelectItem key={el} value={el}>{el}</SelectItem>)
                                        }
                                    </SelectGroup>

                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className='flex' dir='ltr'>
                        <div className='w-[60px] sm:w-[98px] border-[1px] flex justify-center items-center px-4 py-2 font-semibold'>
                            Left
                        </div>
                        <div className={`w-[80px] sm:w-[98px]  flex justify-center items-center ${state.ls.error ? "border border-red-700" : 'border'}`}>
                            <Select dir='ltr' className='' value={state.ls.value} onValueChange={(value) => handleChange('ls', value)}>
                                <SelectTrigger className="focus:ring-0 border-none focus:ring-offset-0 w-[95%]">
                                    <SelectValue placeholder="0" />
                                </SelectTrigger>
                                <SelectContent className='h-40'>
                                    <SelectGroup>
                                        {
                                            generateArray(-8, 8, 0.25).map(el => <SelectItem key={el} value={el}>{el}</SelectItem>)
                                        }
                                    </SelectGroup>

                                </SelectContent>
                            </Select>

                        </div>
                        <div className='w-[80px] sm:w-[98px] border flex justify-center items-center'>

                            <Select dir='ltr' className='' value={state.lc.value} onValueChange={(value) => handleChange('lc', value)}>
                                <SelectTrigger className="focus:ring-0 border-none focus:ring-offset-0 w-[95%]">
                                    <SelectValue placeholder="0" />
                                </SelectTrigger>
                                <SelectContent className='h-40'>
                                    <SelectGroup>
                                        {
                                            generateArray(-4, 0, 0.25).map(el => <SelectItem key={el} value={el}>{el}</SelectItem>)
                                        }
                                    </SelectGroup>

                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <input
                                type='number'
                                className='w-[60px] sm:w-[98px] border flex justify-center items-center p-3 outline-none'
                            />
                        </div>

                        <div className='w-[80px] sm:w-[98px] border flex justify-center items-center '>
                            <Select dir='ltr' className='' value={state.ladd.value} onValueChange={(value) => handleChange('ladd', value)}>
                                <SelectTrigger className="focus:ring-0 border-none focus:ring-offset-0 w-[95%]">
                                    <SelectValue placeholder="0" />
                                </SelectTrigger>
                                <SelectContent className='h-40'>
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
            </Fade>
        </>
    )
}