
"use client";

import React from "react";
import { useFormContext } from "../../context/FormContext";
import Power from "./power";
import LensType from "../_component/LensType/LensType";
import Langaguage from "../_component/Langugage/langaguage";
import PowerType from "../_component/PowerType/powerType";
import FrameType from "../_component/FrameType/frameType";

const MultiStepForm = () => {
  const { state } = useFormContext();
  return (
    <div dir={state.lang.value === "ar" ? 'rtl' : 'ltr'} id="animated" className={` flex justify-end items-center`}>
      {state.step === 1 && <Langaguage />}
      {state.step === 2 && <Power />}
      {state.step === 3 && <PowerType />}
      {state.step === 4 && <LensType />}
      {state.step === 5 && <FrameType />}
    </div>
  );
};

export default MultiStepForm;
