import Link from "next/link";
import {
  FaDatabase,
  FaLock,
  FaShareAlt,
  FaUserShield,
  FaCookie,
  FaClock,
  FaEnvelope,
} from "react-icons/fa";
import { MdPerson, MdInfo } from "react-icons/md";
import HeaderForBrandDedailes from "../_components/HeaderForBrandDedailes";

export default function page() {
  return (
    <>
      <HeaderForBrandDedailes title="Privacy Policy " isprivacy={true} />
      <div className="w-10/12 m-auto py-10">
        {/* Header */}
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5 mb-8 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#16A34A] flex items-center justify-center shrink-0">
            <FaUserShield className="text-white" size={16} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 mb-1">
              Your Privacy Matters
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              This Privacy Policy describes how FreshCart collects, uses, and
              protects your personal information when you use our services. We
              are committed to ensuring that your privacy is protected.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Article 1 */}
          <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaDatabase className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">ARTICLE 1</p>
                <h3 className="font-bold text-gray-900">
                  Information We Collect
                </h3>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="text-gray-400 mr-2">1.1</span>
                <span className="font-semibold text-gray-800">
                  Personal Data:
                </span>{" "}
                Name, email address, phone number, and shipping address.
              </p>
              <p>
                <span className="text-gray-400 mr-2">1.2</span>
                <span className="font-semibold text-gray-800">
                  Payment Data:
                </span>{" "}
                Credit card information processed securely through our payment
                providers.
              </p>
              <p>
                <span className="text-gray-400 mr-2">1.3</span>
                <span className="font-semibold text-gray-800">
                  Technical Data:
                </span>{" "}
                IP address, browser type, device information, and access times.
              </p>
              <p>
                <span className="text-gray-400 mr-2">1.4</span>
                <span className="font-semibold text-gray-800">
                  Usage Data:
                </span>{" "}
                Pages viewed, products browsed, and actions taken within our
                platform.
              </p>
            </div>
          </div>

          {/* Article 2 */}
          <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <MdPerson className="text-[#16A34A]" size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">ARTICLE 2</p>
                <h3 className="font-bold text-gray-900">
                  How We Use Your Information
                </h3>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="text-gray-400 mr-2">2.1</span>To process and
                fulfill your orders.
              </p>
              <p>
                <span className="text-gray-400 mr-2">2.2</span>To send order
                confirmations and shipping updates.
              </p>
              <p>
                <span className="text-gray-400 mr-2">2.3</span>To provide
                customer support and respond to inquiries.
              </p>
              <p>
                <span className="text-gray-400 mr-2">2.4</span>To improve our
                products, services, and user experience.
              </p>
              <p>
                <span className="text-gray-400 mr-2">2.5</span>To send
                promotional communications (with your consent).
              </p>
            </div>
          </div>

          {/* Article 3 */}
          <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaLock className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">ARTICLE 3</p>
                <h3 className="font-bold text-gray-900">Data Protection</h3>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="text-gray-400 mr-2">3.1</span>We implement
                industry-standard encryption (SSL/TLS) for all data transfers.
              </p>
              <p>
                <span className="text-gray-400 mr-2">3.2</span>Payment
                information is processed by PCI-compliant payment providers.
              </p>
              <p>
                <span className="text-gray-400 mr-2">3.3</span>We conduct
                regular security audits and vulnerability assessments.
              </p>
              <p>
                <span className="text-gray-400 mr-2">3.4</span>Access to
                personal data is restricted to authorized personnel only.
              </p>
            </div>
          </div>

          {/* Article 4 */}
          <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaShareAlt className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">ARTICLE 4</p>
                <h3 className="font-bold text-gray-900">Information Sharing</h3>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="text-gray-400 mr-2">4.1</span>We do not sell,
                trade, or rent your personal information to third parties.
              </p>
              <p>
                <span className="text-gray-400 mr-2">4.2</span>We may share data
                with trusted service providers who assist in our operations.
              </p>
              <p>
                <span className="text-gray-400 mr-2">4.3</span>We may disclose
                information when required by law or to protect our rights.
              </p>
            </div>
          </div>

          {/* Article 5 */}
          <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaUserShield className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">ARTICLE 5</p>
                <h3 className="font-bold text-gray-900">Your Rights</h3>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="text-gray-400 mr-2">5.1</span>
                <span className="font-semibold text-gray-800">
                  Access:
                </span>{" "}
                Request a copy of your personal data.
              </p>
              <p>
                <span className="text-gray-400 mr-2">5.2</span>
                <span className="font-semibold text-gray-800">
                  Rectification:
                </span>{" "}
                Request correction of inaccurate data.
              </p>
              <p>
                <span className="text-gray-400 mr-2">5.3</span>
                <span className="font-semibold text-gray-800">
                  Erasure:
                </span>{" "}
                Request deletion of your personal data.
              </p>
              <p>
                <span className="text-gray-400 mr-2">5.4</span>
                <span className="font-semibold text-gray-800">
                  Portability:
                </span>{" "}
                Request your data in a portable format.
              </p>
              <p>
                <span className="text-gray-400 mr-2">5.5</span>
                <span className="font-semibold text-gray-800">
                  Opt-out:
                </span>{" "}
                Unsubscribe from marketing communications at any time.
              </p>
            </div>
          </div>

          {/* Article 6 */}
          <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaCookie className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">ARTICLE 6</p>
                <h3 className="font-bold text-gray-900">Cookies</h3>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="text-gray-400 mr-2">6.1</span>We use cookies to
                enhance your browsing experience and remember preferences.
              </p>
              <p>
                <span className="text-gray-400 mr-2">6.2</span>You can control
                cookie settings through your browser preferences.
              </p>
              <p>
                <span className="text-gray-400 mr-2">6.3</span>Disabling cookies
                may affect the functionality of certain features.
              </p>
            </div>
          </div>

          {/* Article 7 */}
          <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaClock className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">ARTICLE 7</p>
                <h3 className="font-bold text-gray-900">Data Retention</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              We retain your personal information only for as long as necessary
              to fulfill the purposes outlined in this policy, or as required by
              law. Account data is deleted within 30 days of account closure
              upon request.
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
              For questions about this Privacy Policy or to exercise your
              rights, contact our Data Protection Officer at{" "}
              <a
                href="mailto:privacy@freshcart.com"
                className="text-[#16A34A] hover:underline"
              >
                privacy@freshcart.com
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
            href="/terms"
            className="flex items-center gap-2 text-sm text-white bg-[#16A34A] hover:bg-[#15803D] rounded-xl px-4 py-2.5 transition"
          >
            View Terms of Service →
          </Link>
        </div>
      </div>
    </>
  );
}
