'use client'

import React from 'react'
import { useFormContext } from '@/app/context/FormContext'
import { lang } from '@/utils/lang'
import { Fade } from 'react-awesome-reveal'

const FrameType = () => {
    const { state, handleChange } = useFormContext();
    return (
        <>
            <Fade >
                <div className=' rounded-[20px] '>
                    <h3 className='font-semibold px-2 py-6 text-2xl sm:text-3xl'>{lang?.[state.lang.value]?.frameType?.['title']}</h3>


                    <div className="radio-list">
                        <div className="radio-item uppercase border rounded" onClick={() => handleChange('frameType', false)}>
                            <input name="radio" id="radio1" type="radio" checked={state?.frameType?.value === false} />
                            <label htmlFor="radio1" className='flex gap-4'>
                                <span>{lang?.[state.lang.value]?.frameType?.['No']}</span>
                            </label>
                        </div>
                        <div className="radio-item uppercase border rounded" onClick={() => handleChange('frameType', true)}>
                            <input name="radio" id="radio2" type="radio" checked={state?.frameType?.value === true} />
                            <label htmlFor="radio2" className='flex gap-4'>
                                <div>
                                    <span>{lang?.[state.lang.value]?.frameType?.['Yes']}</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </Fade>
        </>
    )
}

export default FrameType