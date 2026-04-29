import Link from "next/link";
import {
  FaHandshake,
  FaUser,
  FaUserCheck,
  FaCreditCard,
  FaTruck,
  FaUndo,
  FaBalanceScale,
  FaEnvelope,
} from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import HeaderForBrandDedailes from "../_components/HeaderForBrandDedailes";

export default function page() {
  return (
    <>
      <HeaderForBrandDedailes title="Terms of Service" isprivacy={true} />
      <div className="w-10/12 m-auto py-10">
        {/* Header */}
        <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl p-5 mb-8 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#F97316] flex items-center justify-center shrink-0">
            <MdWarning className="text-white" size={18} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 mb-1">Important Notice</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              By accessing and using FreshCart, you accept and agree to be bound
              by the terms and provisions of this agreement. Please read these
              terms carefully before using our services.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Article 1 */}
          <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaHandshake className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">ARTICLE 1</p>
                <h3 className="font-bold text-gray-900">Acceptance of Terms</h3>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="text-gray-400 mr-2">1.1</span>By accessing or
                using the Service, you acknowledge that you have read,
                understood, and agree to be bound by these Terms.
              </p>
              <p>
                <span className="text-gray-400 mr-2">1.2</span>If you do not
                agree to these Terms, you must not access or use the Service.
              </p>
              <p>
                <span className="text-gray-400 mr-2">1.3</span>We reserve the
                right to modify these Terms at any time, and such modifications
                shall be effective immediately upon posting.
              </p>
            </div>
          </div>

          {/* Article 2 */}
          <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaUserCheck className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">ARTICLE 2</p>
                <h3 className="font-bold text-gray-900">User Eligibility</h3>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="text-gray-400 mr-2">2.1</span>The Service is
                intended for users who are at least eighteen (18) years of age.
              </p>
              <p>
                <span className="text-gray-400 mr-2">2.2</span>By using the
                Service, you represent and warrant that you are of legal age to
                form a binding contract.
              </p>
              <p>
                <span className="text-gray-400 mr-2">2.3</span>If you are
                accessing the Service on behalf of a legal entity, you represent
                that you have the authority to bind such entity.
              </p>
            </div>
          </div>

          {/* Article 3 */}
          <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaUser className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">ARTICLE 3</p>
                <h3 className="font-bold text-gray-900">
                  Account Registration
                </h3>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="text-gray-400 mr-2">3.1</span>You may be
                required to create an account to access certain features of the
                Service.
              </p>
              <p>
                <span className="text-gray-400 mr-2">3.2</span>You agree to
                provide accurate, current, and complete information during
                registration.
              </p>
              <p>
                <span className="text-gray-400 mr-2">3.3</span>You are solely
                responsible for maintaining the confidentiality of your account
                credentials.
              </p>
              <p>
                <span className="text-gray-400 mr-2">3.4</span>You agree to
                notify us immediately of any unauthorized use of your account.
              </p>
            </div>
          </div>

          {/* Article 4 */}
          <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaCreditCard className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">ARTICLE 4</p>
                <h3 className="font-bold text-gray-900">Orders and Payments</h3>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="text-gray-400 mr-2">4.1</span>All orders placed
                through the Service are subject to acceptance and availability.
              </p>
              <p>
                <span className="text-gray-400 mr-2">4.2</span>Prices are
                subject to change without notice prior to order confirmation.
              </p>
              <p>
                <span className="text-gray-400 mr-2">4.3</span>Payment must be
                made in full at the time of purchase through approved payment
                methods.
              </p>
              <p>
                <span className="text-gray-400 mr-2">4.4</span>We reserve the
                right to refuse or cancel any order at our sole discretion.
              </p>
            </div>
          </div>

          {/* Article 5 */}
          <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaTruck className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">ARTICLE 5</p>
                <h3 className="font-bold text-gray-900">
                  Shipping and Delivery
                </h3>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="text-gray-400 mr-2">5.1</span>Shipping times
                are estimates only and are not guaranteed.
              </p>
              <p>
                <span className="text-gray-400 mr-2">5.2</span>Risk of loss and
                title for items purchased pass to you upon delivery to the
                carrier.
              </p>
              <p>
                <span className="text-gray-400 mr-2">5.3</span>We are not
                responsible for delays caused by carriers, customs, or other
                factors beyond our control.
              </p>
            </div>
          </div>

          {/* Article 6 */}
          <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaUndo className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">ARTICLE 6</p>
                <h3 className="font-bold text-gray-900">Returns and Refunds</h3>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="text-gray-400 mr-2">6.1</span>Our return policy
                allows returns within 14 days of delivery for most items.
              </p>
              <p>
                <span className="text-gray-400 mr-2">6.2</span>Products must be
                unused and in original packaging.
              </p>
              <p>
                <span className="text-gray-400 mr-2">6.3</span>Refunds will be
                processed within 5-7 business days after receiving the returned
                item.
              </p>
            </div>
          </div>

          {/* Article 7 */}
          <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaBalanceScale className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">ARTICLE 7</p>
                <h3 className="font-bold text-gray-900">
                  Limitation of Liability
                </h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              To the maximum extent permitted by applicable law, FreshCart shall
              not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or
              revenues, whether incurred directly or indirectly.
            </p>
          </div>

          {/* Article 8 */}
          <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaEnvelope className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">ARTICLE 8</p>
                <h3 className="font-bold text-gray-900">Contact Us</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              If you have any questions about these Terms, please contact us at{" "}
              <a
                href="mailto:support@freshcart.com"
                className="text-[#16A34A] hover:underline"
              >
                support@freshcart.com
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 rounded-xl px-4 py-2.5 hover:bg-gray-50 transition"
          >
            ← Back to Home
          </Link>
          <Link
            href="/privacy"
            className="flex items-center gap-2 text-sm text-white bg-[#16A34A] hover:bg-[#15803D] rounded-xl px-4 py-2.5 transition"
          >
            View Privacy Policy →
          </Link>
        </div>
      </div>
    </>
  );
}
