"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
  FaQuestionCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { useState } from "react";
import BeatLoader from "react-spinners/esm/BeatLoader";
import HeaderForBrandDedailes from "../_components/HeaderForBrandDedailes";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactForm = z.infer<typeof contactSchema>;

export default function ContactClient() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(data: ContactForm) {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    console.log(data);
    setSuccess(true);
    reset();
    setLoading(false);
  }

  return (
    <>
      <HeaderForBrandDedailes title="Contact US" isContact={true} />{" "}
      <div className="w-10/12 m-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ── Left Column ── */}
          <div className="flex flex-col gap-4">
            <div className="border border-gray-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaPhone className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-0.5">Phone</p>
                <p className="text-sm text-gray-500 mb-1">
                  Mon-Fri from 8am to 6pm
                </p>
                <a
                  href="tel:+18001234567"
                  className="text-sm font-semibold text-[#16A34A] hover:underline"
                >
                  +1 (800) 123-4567
                </a>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaEnvelope className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-0.5">Email</p>
                <p className="text-sm text-gray-500 mb-1">
                  We'll respond within 24 hours
                </p>
                <a
                  href="mailto:support@freshcart.com"
                  className="text-sm font-semibold text-[#16A34A] hover:underline"
                >
                  support@freshcart.com
                </a>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaMapMarkerAlt className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-0.5">Office</p>
                <p className="text-sm text-gray-500">123 Commerce Street</p>
                <p className="text-sm text-gray-500">New York, NY 10001</p>
                <p className="text-sm text-gray-500">United States</p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <FaClock className="text-[#16A34A]" size={14} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-0.5">
                  Business Hours
                </p>
                <p className="text-sm text-gray-500">
                  Monday - Friday: 8am - 6pm
                </p>
                <p className="text-sm text-gray-500">Saturday: 9am - 4pm</p>
                <p className="text-sm text-gray-500">Sunday: Closed</p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="font-semibold text-gray-900 mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                {[
                  { icon: <FaFacebookF size={14} />, href: "#" },
                  { icon: <FaTwitter size={14} />, href: "#" },
                  { icon: <FaInstagram size={14} />, href: "#" },
                  { icon: <FaLinkedinIn size={14} />, href: "#" },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#F0FDF4] hover:text-[#16A34A] hover:border-[#BBF7D0] transition duration-200"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="flex flex-col gap-4">
            <div className="border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-[#16A34A]" size={14} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Send us a Message</h3>
                  <p className="text-xs text-gray-500">
                    Fill out the form and we'll get back to you
                  </p>
                </div>
              </div>

              {/* Success */}
              {success && (
                <div className="flex items-center gap-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4 mb-4">
                  <FaCheckCircle
                    className="text-[#16A34A] shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#16A34A]">
                      Message sent successfully!
                    </p>
                    <p className="text-xs text-gray-500">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name + Email */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="John Doe"
                          className="h-11 rounded-xl border-gray-200"
                        />
                      )}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          placeholder="john@example.com"
                          className="h-11 rounded-xl border-gray-200"
                        />
                      )}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">
                    Subject
                  </Label>
                  <Controller
                    name="subject"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full h-11 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-[#16A34A] transition text-gray-500 bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="order">Order Issue</option>
                        <option value="shipping">Shipping</option>
                        <option value="returns">Returns & Refunds</option>
                        <option value="other">Other</option>
                      </select>
                    )}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">
                    Message
                  </Label>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="How can we help you?"
                        className="rounded-xl border-gray-200 resize-none min-h-[120px]"
                      />
                    )}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold px-6 h-11 rounded-xl transition duration-200 cursor-pointer"
                >
                  {loading ? (
                    <BeatLoader color="#fff" size={8} />
                  ) : (
                    <>
                      <FaPaperPlane size={13} /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Help Center */}
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-5 flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                <FaQuestionCircle className="text-[#16A34A]" size={16} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  Looking for quick answers?
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Check out our Help Center for frequently asked questions about
                  orders, shipping, returns, and more.
                </p>
                <a
                  href="#"
                  className="text-sm text-[#16A34A] font-medium hover:underline"
                >
                  Visit Help Center →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
