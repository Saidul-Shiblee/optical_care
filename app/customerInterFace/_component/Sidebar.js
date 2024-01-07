import { useFormContext } from "@/app/context/FormContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import OpticalCare from "./../../../public/opticalShop.png";

const Sidebar = () => {
    const { state } = useFormContext()
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedFrameValue, setSleectedFrameValue] = useState("");
    useEffect(() => {
        if (state?.lensType?.value === "6585c5eed71dd57bf1c363af") {
            setSelectedValue("Clear")
        }
        if (state?.lensType?.value === "658579fca68abf092b93a21a") {
            setSelectedValue("Automatic")
        }
        if (state?.lensType?.value === "6585ba170eb26cfd7bc7942b") {
            setSelectedValue("Tented")
        }
        if (state?.lensType?.value === "658c647383a3b9afb9905df5") {
            setSelectedValue("Blue cut")
        }

        if (state?.frameType.value === false) {
            setSleectedFrameValue("Full Frame");
        }
        if (state?.frameType.value === true) {
            setSleectedFrameValue("Rimless Frame");
        }

    }, [state])
    return (
      <div className="bg-white border h-full bottom-0 w-full shadow-2xl px-8 flex flex-col gap-8">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="relative p-4 w-full h-[350px]">
            <Image
              className="absolute "
              src={OpticalCare}
              fill
              alt="optical care object-fit"
            />
          </div>
          <h2 className="text-[#080a36] font-bold text-2xl">
            Easy steps to find and customize your prescription lenses
          </h2>
        </div>

        <div className="Flex flex-col">
          <h1 className="text-3xl font-bold text-[#253D85] ">Your Selection</h1>
          <h3 className="font-semibold mt-4 flex gap-2">
            Lens type:{" "}
            <span className={`${state.step > 2 ? "block" : "hidden"}`}>
              {(state?.radd?.value||state?.radd?.value)? `${state?.powerType?.value} -`:""}{selectedValue}{" "}
            </span>
          </h3>
          <h3 className="font-semibold mt-4 flex gap-2">
            Frame Type:{" "}
            <span className={`${state.step === 5 ? "block" : "hidden"}`}>
              {selectedFrameValue}
            </span>
          </h3>
        </div>
      </div>
    );
};

export default Sidebar;