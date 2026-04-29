import Link from "next/link";
import { BsBagCheckFill, BsBoxSeam } from "react-icons/bs";
import { FaBagShopping } from "react-icons/fa6";
import AllOrderAccordion from "../_components/AllOrderAccordion";
import { getUserOrder } from "../_action/allOrders.action";

export default async function page() {
  const allOrders = await getUserOrder();
  console.log(allOrders);
  if (allOrders?.length == 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
          <BsBoxSeam className="w-12 h-12 text-gray-400" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">No orders yet</h2>

        <p className="text-gray-500 text-center text-sm mb-8 max-w-xs">
          When you place orders, they'll appear here so you can track them.
        </p>

        <Link
          href="/"
          className="shadow-lg hover:-translate-y-2 shadow-[#74ad89] flex items-center gap-2 bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-bold px-8 py-3 rounded-xl hover:from-[#13803b] hover:to-[#166534] transition-all duration-300"
        >
          Start Shopping <span className="text-lg">→</span>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <div className="bg-gray-50">
        <div className="w-11/12 m-auto">
          {/* top info */}
          <div className="py-5">
            <span className="text-xs text-gray-500">
              <Link className="hover:text-green-600 transition" href="/">
                Home
              </Link>{" "}
              / <span className="text-gray-800">My Orders</span>
            </span>
          </div>
          <div className="flex items-center justify-between mb-7">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#16A34A] to-[#15803D] rounded-lg shadow shadow-[#1ca64e]">
                  <BsBagCheckFill className="text-white w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              </div>
              <span className="text-sm text-[#6A7282]">
                Track and manage your {allOrders?.length} orders
              </span>
            </div>

            <Link
              href="/"
              className="flex items-center gap-1 text-green-600 group text-sm font-semibold"
            >
              <FaBagShopping className="text-xl group-hover:-translate-x-1 transition duration-300" />
              <span className="group-hover:scale-105 transition duration-300">
                Continue Shopping
              </span>
            </Link>
          </div>

          {/* Content */}
          <AllOrderAccordion allOrders={allOrders} />
        </div>
      </div>
    </div>
  );
}
