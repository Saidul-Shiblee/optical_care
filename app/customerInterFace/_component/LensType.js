"use client";
import React, { useEffect } from 'react'
import { useFormContext } from '@/app/context/FormContext'
import { lang } from '@/utils/lang'

import { Fade } from 'react-awesome-reveal'
import Image from 'next/image'
import clearGlass from './../../../../public/clear.png';
import blueCutGlass from './../../../../public/bluecut.png';
import tentedGlass from './../../../../public/tinted.png';
import automaticGlass from './../../../../public/automatic.png';


const LensType = () => {
    const { state, handleChange, lensType, } = useFormContext();
    useEffect(() => {
        if (state.ladd.value > 0 || state.radd.value > 0) {
            console.log("value set")
            const filterLensType = lensType.filter(el => el?.lensName !== 'Tented' && el?.lensName !== 'Blue Cut')
            handleChange('lensType', filterLensType?.[0]?._id);
            return;
        }


        handleChange('lensType', lensType?.[0]?._id);


    }, [])



    const lensTypeWithImage = lensType.map(el => {
        if (el.lensName === "Automatic") {
            el.image = automaticGlass;
            el.text = "Automatically adapts to changing light, darken when outdoors and return back to clear when indoors."
        }
        if (el.lensName === "Tented") {
            el.image = tentedGlass;
            el.text = "Tinted lenses are lenses with an added pigmented dye, that can be stylish and functional."
        }
        if (el.lensName === "Clear") {
            el.image = clearGlass;
            el.text = "Transparent lenses suitable for all prescription types.";
        }
        if (el.lensName === "Blue Cut") {
            el.image = blueCutGlass;
            el.text = "Protect Blue light emitted from computer and mobile screens"
        }

        return el;
    })



    return (
        <Fade >
            <div className=' rounded-[20px]'>
                <h3 className='font-semibold px-2 py-6 text-2xl sm:text-3xl'>{lang?.[state.lang.value]?.lensType?.title}:</h3>
            </div>

            {
                (state.ladd.value > 0 || state.radd.value > 0) ?

                    lensTypeWithImage.filter(el => el?.lensName !== 'Tented' && el?.lensName !== 'Blue Cut').map(el =>
                        <div key={el?._id} className="lens-item uppercase border rounded-md mb-2 w-[350px] sm:w-[490px]" onClick={() => handleChange('lensType', el._id)}>
                            <input name="radio" id={el._id} type="radio" checked={el._id === state?.lensType?.value} />
                            <label htmlFor={el._id} className='flex gap-4 '>
                                <div className='flex justify-center items-center shrink-0'>
                                    <Image src={el.image} className='w-6 h-6 ' alt='image' />
                                </div>

                                <div>
                                    <span>{lang?.[state.lang.value]?.lensType?.[el.lensName]}</span>
                                    <p className='text-sm normal-case' dir='ltr'>{el.text}</p>
                                </div>
                            </label>
                        </div>


                    )
                    :
                    lensTypeWithImage.map(el =>

                        <div key={el?._id} className="lens-item uppercase border rounded-md mb-2 w-[350px] sm:w-[490px]" onClick={() => handleChange('lensType', el._id)}>
                            <input name="radio" id={el._id} type="radio" checked={el._id === state?.lensType?.value} />
                            <label htmlFor={el._id} className='flex gap-4 '>
                                <div className='flex justify-center items-center shrink-0'>
                                    <Image src={el.image} className='w-6 h-6 ' alt='image' />
                                </div>

                                <div>
                                    <span>{lang?.[state.lang.value]?.lensType?.[el.lensName]}</span>
                                    <p className='text-sm normal-case' dir='ltr'>{el.text}</p>
                                </div>
                            </label>
                        </div>
                    )

            }

        </Fade>
    )

}

export default LensType