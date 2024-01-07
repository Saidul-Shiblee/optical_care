'use client'

import React from 'react'
import { useFormContext } from '@/app/context/FormContext'
import Image from 'next/image'
import { lang } from '@/utils/lang'
import BifocalGlass from "../../../public/bifocal.png";
import progressiveGlass from "../../../publicprogressive.png";

const PowerType = () => {
    const { state, handleChange } = useFormContext();

    return (
        <div >
            <h3 className='font-semibold px-2 py-6 text-2xl sm:text-3xl'>{lang?.[state.lang.value]?.lensType?.title}:</h3>

            <div dir='ltr'>
                <div className="flex items-center space-x-2">

                    <div className="lens-item uppercase rounded-md  mb-3" onClick={() => handleChange('powerType', "Bifocal")}>
                        <input name="radio" value={"Bifocal"} className='text-center' id="radio1" type="radio" checked={state?.powerType?.value === "Bifocal"} />
                        <label for="radio1" className='flex gap-4 mt-4 w-full'>
                            <div className='flex justify-center items-center shrink-0'>
                                <Image src={BifocalGlass} className='w-10 h-10' alt="Bifocal" />
                            </div>
                            <div className=''>
                                <span>Bifocal</span>
                                <p

                                    className='text-sm normal-case '>Lined multifocal. Two prescriptions in one,
                                    Upper for  distance, lower for near vision.</p>
                            </div>
                        </label>
                    </div>




                </div>
                <div className="flex items-center space-x-2">

                    <div className="lens-item uppercase rounded-md w-[360px] sm:w-[490px]" onClick={() => handleChange('powerType', "Progressive")}>
                        <input name="radio" id="radio2" type="radio" checked={state?.powerType?.value === "Progressive"} />
                        <label for="radio2" className='flex gap-4'>
                            <div className='flex justify-center items-center shrink-0'>
                                <Image src={progressiveGlass} className='w-10 h-10' alt='Progressive' />
                            </div>
                            <div className=''>
                                <span>Progressive</span>
                                <p className='text-sm  normal-case'>No-line progressive multifocal lenses, help you see clearly at all distances without the visible lines.</p>
                            </div>
                        </label>
                    </div>

                </div>
            </div>


        </div>


    )
}

export default PowerType