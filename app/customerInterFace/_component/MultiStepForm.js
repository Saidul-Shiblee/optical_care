
"use client";

import React from "react";
import { useFormContext } from "../../context/FormContext";
import Power from "./Power.js";
import LensType from "./LensType";
import Language from "./Language";
import PowerType from "./PowerType";
import FrameType from "./FrameType";

const MultiStepForm = () => {
  const { state } = useFormContext();
  return (
    <div dir={state.lang.value === "ar" ? 'rtl' : 'ltr'} id="animated" className={` flex justify-end items-center`}>
      {state.step === 1 && <Language />}
      {state.step === 2 && <Power />}
      {state.step === 3 && <PowerType />}
      {state.step === 4 && <LensType />}
      {state.step === 5 && <FrameType />}
    </div>
  );
};

export default MultiStepForm;
