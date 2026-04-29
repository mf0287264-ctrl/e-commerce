import FormCard from "@/app/_components/FormCard";
import image from "@/images/signupReview.png";
import { FaShieldAlt, FaShippingFast, FaStar } from "react-icons/fa";
export default function page() {
  return (
    <>
      <div className="w-full max-w-7xl m-auto mt-5 grid grid-cols-1 md:grid-cols-2">
        <div className="col-span-1 p-4">
          <div className="mb-6">
            <h2 className="text-4xl">
              Welcome to <span className="text-[#16A34A]">FreshCart</span>
            </h2>
            <p className="text-xl text-[#364153]">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-[#BBF7D0] rounded-full flex items-center justify-center">
                <FaStar className="text-[#16A34A] w-5 h-5 " />
              </div>
              <div className="">
                <span className="text-lg font-bold">Premium Quality</span>
                <p className="text-[#4A5565]  leading-none ">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-[#BBF7D0] rounded-full flex items-center justify-center">
                <FaShippingFast className="text-[#16A34A] w-5 h-5 " />
              </div>
              <div className="">
                <span className="text-lg font-bold">Fast Delivery</span>
                <p className="text-[#4A5565]  leading-none ">
                  Same-day delivery available in most areas.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-[#BBF7D0] rounded-full flex items-center justify-center">
                <FaShieldAlt className="text-[#16A34A] w-5 h-5 " />
              </div>
              <div className="">
                <span className="text-lg font-bold">Secure Shopping</span>
                <p className="text-[#4A5565]  leading-none ">
                  Your data and payments are completely secure.
                </p>
              </div>
            </div>

            <div className="shadow  p-4 rounded-xl">
              <div className="flex gap-3">
                <img
                  src={image.src}
                  className="rounded-full  w-12 h-12"
                  alt="picture"
                />

                <div className="flex flex-col">
                  <span>Sarah Johnson</span>
                  <span className="flex text-yellow-300">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </span>
                </div>
              </div>
              <p className="mt-4">
                "FreshCart has transformed my shopping experience. The quality
                of the products is outstanding, and the delivery is always on
                time. Highly recommend!"
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 p-4">
          <FormCard />
        </div>
      </div>
    </>
  );
}
