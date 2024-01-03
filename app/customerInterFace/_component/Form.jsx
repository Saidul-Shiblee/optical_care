"use client";
import React, { useState } from "react";
import MultiStepForm from "./MultiStepForm";
import { useFormContext } from "../../context/FormContext";
import { lang } from "@/utils/lang";
import Logo from "../../../public/logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const Form = () => {
  const { state, handleChange, dispatch } = useFormContext();

  const [pack, setPack] = useState([]);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);




  const nextStep = () => {
    if (state.step === 2 && !state.rs.value) {
      dispatch({
        key: "rs",
        payload: { newValue: "", error: "Required" },
      });
      return;
    }
    if (state.step === 2 && !state.ls.value) {
      dispatch({
        key: "ls",
        payload: { newValue: "", error: "Required" },
      });
      return;
    }
    dispatch({
      key: "buttonClicked",
      payload: { newValue: "next" },
    });
    if ((!state.radd.value || !state.ladd.value) && state.step === 2) {
      handleChange("step", state.step + 2);
    } else {
      handleChange("step", state.step + 1);
    }
  };

  const prevStep = () => {
    if (state.step === 1) return;
    dispatch({
      key: "buttonClicked",
      payload: { newValue: "prev" },
    });
    if ((!state.radd.value || !state.ladd.value) && state.step === 4) {
      handleChange("step", state.step - 2);
    } else {
      handleChange("step", state.step - 1);
    }
  };

  const handleQuote = async () => {
    console.log("quote");
    try {
        setLoading(true)
         const res = await fetch("/api/quote", {
           method: "POST",
           body: JSON.stringify({
             leftEyeSpherical: state.ls.value,
             ...(state.lc.value
               ? { leftEyeCylindrical: state.lc.value }
               : { leftEyeCylindrical: 0 }),
             leftEyeAdditional: state.ladd.value,
             rightEyeSpherical: state.rs.value,
             ...(state.rc.value
               ? { rightEyeCylindrical: state.rc.value }
               : { rightEyeCylindrical: 0 }),
             rightEyeAdditional: state.radd.value,
             lensType: state.lensType.value,
             frameType: state.frameType.value,
             ...(state.ladd.value || state.radd.value
               ? { powerType: state.powerType.value }
               : {}),
           }),
           cache: "no-store",
         });
         const result = await res.json();

          console.log(result)

         if (res.ok && result.Message === "Package found") {
           setPack(result.packages);
           
         }
         if (res.ok && result.Message === "Package found" && result.packages.length===0) {
           setWarning(true);
         }
         if (res.ok && result.Message === "No Package found") {
          console.log("hi there")
           setWarning(true);
         }

       
         
      
    } catch (error) {
      
    } finally{
      setLoading(false)
    }
 
  };

  return (
    <div className="flex justify-center items-center w-full h-screen text-[#080a36] py-10 overflow-x-hidden px-4">
      {state.step === 5 && pack.length > 1 && (
        <Button
          onClick={() => location.reload()}
          className="absolute right-20 top-20"
        >
          Refresh{" "}
        </Button>
      )}
      {state.step === 5 && warning && (
        <Button
          onClick={() => location.reload()}
          className="absolute right-20 top-20"
        >
          Refresh{" "}
        </Button>
      )}
      {pack.length <= 0 && !loading && !warning && (
        <div className="flex flex-col absolute h-[400px]   gap-10 w-[350px] md:w-[410px] xl:w-[490px]">
          <MultiStepForm />

          {state.step > 1 && (
            <>
              {state.step === 5 ? (
                <button
                  onClick={handleQuote}
                  className="font-medium bg-[#080a36] text-lg  select-none text-white py-3 px-5 rounded-lg cursor-pointer transition duration-100 hover:opacity-90  self-end  w-[160px] "
                >
                  {lang?.[state.lang.value]?.["Get Quote"]}
                </button>
              ) : (
                <button
                  id="next"
                  onClick={nextStep}
                  className="  font-medium bg-[#080a36] text-lg select-none text-white py-3 px-5 rounded-lg cursor-pointer transition duration-100 hover:opacity-90  self-end w-[150px]"
                >
                  {lang?.[state.lang.value]?.["Next Step"]}
                </button>
              )}
            </>
          )}
        </div>
      )}
      {pack.length > 1 && !loading && !warning && (
        <div className="flex flex-col gap-10 mt-16 md:-mt-14 ">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 relative overflow-hidden  ">
              <Image
                src={Logo}
                alt="logo"
                fill
                className="absolute rounded-full "
              />
            </div>
            <p className="text-center text-xl ">
              <span className="font-semibold text-2xl block mb-1">
                🎉🎉 Congratulations! 🎉🎉
              </span>
              <br />
              You have slected {pack[0].lenseType.lensName}{" "}
              {state.radd.value || state.ladd.value
                ? state.powerType.value
                : ""}{" "}
              lens <br />
              Here are the three packages for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pack.map((el) => (
              <div
                className="flex flex-col p-4 shadow-lg rounded-md  border bg-[#080a36] text-white"
                key={el._id}
              >
                <div className="text-2xl font-semibold mb-3">
                  {el.package.packageName} Package
                </div>
                <div>
                  {state.frameType.value && el.rimlessAvailable ? (
                    <p className="font-semibold text-xl">
                      SAR-{el.lensePrice + el.rimlessPrice}
                    </p>
                  ) : state.frameType.value && !el.rimlessAvailable ? (
                    <p className="font-semibold text-xl">{el.remarks}</p>
                  ) : !state.frameType.value ? (
                    <p className="font-semibold text-xl">SAR-{el.lensePrice}</p>
                  ) : null}
                </div>
                <div>
                  {state.frameType.value && el.rimlessAvailable ? (
                    <p>{el.rimlessAttributes}</p>
                  ) : state.frameType.value &&
                    !el.rimlessAvailable ? null : !state.frameType.value ? (
                    <p>{el.attributes}</p>
                  ) : null}
                </div>
                <div>
                  {state.frameType.value && el.rimlessAvailable ? (
                    <p>{el.lenseType.lensName}</p>
                  ) : state.frameType.value &&
                    !el.rimlessAvailable ? null : !state.frameType.value ? (
                    <p>{el.lenseType.lensName}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {pack.length <= 0 && !loading && warning && (
        <div className="flex flex-col items-center   gap-4">
          <div className="w-12 h-12 relative overflow-hidden  ">
            <Image
              src={Logo}
              alt="logo"
              fill
              className="absolute rounded-full "
            />
          </div>
          <div className="shadow-lg rounded-md  border bg-[#080a36] text-white p-4">
            <p>
              Your Power requires more specifications.
              <br />
              please consult with one of our doctors
            </p>
          </div>
        </div>
      )}
      {pack.length <= 0 && loading && (
        <div className="flex justify-center items-center  h-[400px] w-[600px] gap-10">
          <div class="lds-hourglass"></div>
        </div>
      )}
    </div>
  );
};

export default Form;
