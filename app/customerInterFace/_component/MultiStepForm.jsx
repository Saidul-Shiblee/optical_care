"use client";

import React, { useEffect } from "react";
// import SectionHeading from "./SectionHeading";
// import { FORMDETAILS } from "../utils/constants";
import { useFormContext } from "../../context/FormContext";
import Power from "./power";
import PowerType from "./PowerType/powerType";
import LensType from "./LensType/lensType";
import FrameType from "./FrameType/frameType";
import Langaguage from "./Langugage/langaguage";

const MultiStepForm = () => {
  const { state, handleChange, resetError } = useFormContext();
  useEffect(() => {
    const animated = document.querySelector("#animated");
    const prevButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");

    console.log(prevButton)

    if (state.step >= 2 && state.buttonClicked === "next") {

      animated.classList.add("animate__slideInRight");
    }
    if (state.buttonClicked === "prev") {
      animated.classList.add("animate__slideInLeft");
    }
    // animated.addEventListener("animationstart", () => {
    //   if (prevButton) prevButton.disabled = true;
    // });

    animated.addEventListener("animationend", () => {
      // prevButton.disabled = false;

      if (animated.classList.contains("animate__slideInRight")) {
        animated.classList.remove("animate__slideInRight");
      }
      if (animated.classList.contains("animate__slideInLeft")) {
        animated.classList.remove("animate__slideInLeft");
      }
    });
  }, [state.step, state.buttonClicked]);

  return (
    <div dir={state.lang.value==="ar"?'rtl':'ltr'} id="animated" className={`animate__animated `}>
      {state.step === 1 && <Langaguage />}
      {state.step === 2 && <Power />}
      {state.step === 3 && <PowerType />}
      {state.step === 4 && <LensType />}
      {state.step === 5 && <FrameType />}
    </div>
  );
};

export default MultiStepForm;
