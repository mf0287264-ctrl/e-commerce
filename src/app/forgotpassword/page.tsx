import React from "react";
import FogotPasswordCaptionCard from "../_components/FogotPasswordCaptionCard";
import ForgotPasswordCard from "../_components/ForgotPasswordCard";

export default function page() {
  return (
    <div className="w-9/12 m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 mt-20 mb-20">
        <div className="col-span-1 hidden md:flex px-3">
          <FogotPasswordCaptionCard />
        </div>
        <div className="col-span-1 ">
          <ForgotPasswordCard />
        </div>
      </div>
    </div>
  );
}
