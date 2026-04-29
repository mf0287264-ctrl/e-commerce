import { FaLock, FaShieldAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
export default function FogotPasswordCaptionCard() {
  return (
    <div className="">
      {/* Illustration Area */}
      <div className="relative bg-[#F0FDF4] shadow-md shadow-[#0000001A]  h-[300px]  max-w-xl mx-auto flex items-center justify-center rounded-[16px] ">
        {/* Decorative circles */}
        <div className="absolute w-32 h-32 rounded-full bg-[#DCFCE7] opacity-60 top-4 left-6" />
        <div className="absolute w-20 h-20 rounded-full bg-[#DCFCE7] opacity-60 bottom-6 right-10" />
        <div className="absolute w-14 h-14 rounded-full bg-[#DCFCE7] opacity-60 top-8 right-20" />

        {/* Icons row */}
        <div className="relative flex items-center gap-2 z-10">
          {/* Email icon */}
          <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center -translate-y-2 -rotate-14">
            <IoMdMail className="text-[#22C55E] text-xl" />
          </div>
          {/* Lock icon - center, larger */}
          <div className="w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center rotate-3">
            <div className="w-14 h-14 bg-[#DCFCE7] rounded-xl flex items-center justify-center">
              <FaLock className="text-[#16A34A] text-2xl" />
            </div>
          </div>

          {/* Shield icon */}
          <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center rotate-14">
            <FaShieldAlt className="text-[#22C55E] text-xl" />
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
          <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
          <div className="w-2 h-2 rounded-full bg-[#16A34A] opacity-40" />
        </div>
      </div>

      {/* Text Area */}
      <div className="bg-white px-6 py-5 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Reset Your Password
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          Don't worry, it happens to the best of us. We'll help you get back
          into your account in no time.
        </p>

        {/* Feature badges */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <IoMdMail className="text-[#16A34A]" size={13} />
            Email Verification
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaShieldAlt className="text-[#16A34A]" size={13} />
            Secure Reset
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaLock className="text-[#16A34A]" size={13} />
            Encrypted
          </span>
        </div>
      </div>
    </div>
  );
}
