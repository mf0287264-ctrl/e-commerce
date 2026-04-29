import LoginFormCard from "@/app/_components/LoginFormCard";
import image from "@/images/loginBg.png";
import { FaShieldAlt } from "react-icons/fa";
import { MdHeadsetMic, MdLocalShipping } from "react-icons/md";
export default function page() {
  return (
    <>
      <div className="w-full max-w-7xl m-auto mt-5 grid grid-cols-1 md:grid-cols-2">
        <div className="col-span-1 p-7 pt-20 ">
          <img
            src={image.src}
            alt="loginBg"
            className="w-[616px] h-[384px] object-cover shadow-lg rounded-[16px]"
          />
          <div className="text-center pt-6 pb-10">
            {/* Title */}
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
              FreshCart - <span>Your One-Stop Shop for Fresh Products</span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-500 text-base mb-6">
              Join thousands of happy customers who trust FreshCart for their
              daily grocery needs
            </p>

            {/* Badges */}
            <div className="flex items-center justify-center gap-9 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <MdLocalShipping className="text-[#16A34A] text-lg" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaShieldAlt className="text-[#16A34A] text-lg" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MdHeadsetMic className="text-[#16A34A] text-lg" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 p-4">
          <LoginFormCard />
        </div>
      </div>
    </>
  );
}
