"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaKey, FaLock } from "react-icons/fa";
import { IoIosArrowRoundBack, IoMdMail } from "react-icons/io";
import BeatLoader from "react-spinners/esm/BeatLoader";
import { toast } from "sonner";
import { z } from "zod";
import { forgotPass } from "../_action/ForgotPassword";

const emailSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});
type EmailForm = z.infer<typeof emailSchema>;
export default function ForgotPasswordCard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });
  async function onSubmit(data: EmailForm) {
    setLoading(true);
    const res = await forgotPass(data.email);
    if (res?.statusMsg == "success") {
      setLoading(false);
      console.log(res);
      toast.success(res.message, {
        richColors: true,
        position: "top-right",
      });
      router.push(`/VerifyCode/${encodeURIComponent(data.email)}`);
    } else if (res?.statusMsg == "fail") {
      toast.error(res?.message, {
        richColors: true,
        position: "top-left",
      });
    } else if (res == null) {
      toast.error("something went wrong", {
        richColors: true,
        position: "top-left",
      });
    }
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#F3F4F6] p-8 w-full max-w-lg mx-auto">
      {/* Logo */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          <span className="text-[#16A34A]">Fresh</span>Cart
        </h1>
        <h2 className="text-xl font-bold text-gray-900 mt-3">
          Forgot Password?
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          <span>No worries, we'll send you a reset code</span>
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-10 h-10 rounded-full shadow-lg shadow-[#16A34A40] bg-[#16A34A] flex items-center justify-center">
          <IoMdMail className="text-white" size={16} />
        </div>
        <div className="w-16 h-0.5 bg-[#E5E7EB]" />
        <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center">
          <FaKey className="text-gray-400" size={13} />
        </div>
        <div className="w-16 h-0.5 bg-[#E5E7EB]" />
        <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center">
          <FaLock className="text-gray-400" size={13} />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-gray-700">
            Email Address
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <IoMdMail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  className="pl-9 h-11 rounded-xl border-gray-200"
                />
              </div>
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <Button
          disabled={loading}
          type="submit"
          className="w-full h-12 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-xl font-semibold cursor-pointer transition duration-200"
        >
          {loading ? (
            <BeatLoader color="#40ff05" />
          ) : (
            <span> Send Reset Code</span>
          )}
        </Button>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm text-[#16A34A] hover:text-[#15803D] flex items-center justify-center gap-1 transition flex items-center"
          >
            <IoIosArrowRoundBack className="text-xl" /> Back to Sign In
          </Link>
        </div>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Remember your password?{" "}
        <Link
          href="/login"
          className="text-[#16A34A] font-medium hover:text-[#15803D] transition"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
