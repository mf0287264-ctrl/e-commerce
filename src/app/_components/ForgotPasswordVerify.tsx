"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaKey, FaLock, FaShieldAlt } from "react-icons/fa";
import { IoIosArrowRoundBack, IoMdMail } from "react-icons/io";
import BeatLoader from "react-spinners/esm/BeatLoader";
import { toast } from "sonner";
import { z } from "zod";
import { forgotPass, forgotPassVerifyCode } from "../_action/ForgotPassword";
import { Spinner } from "@/components/ui/spinner";

const emailSchema = z.object({
  resetCode: z
    .string()
    .min(5, "Code must be 6 digits")
    .max(6, "Code must be 6 digits"),
});
export type CodeForm = z.infer<typeof emailSchema>;
export default function ForgotPasswordVerify({ email }: { email: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resetCodeLoading, setResetCodeLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { resetCode: "" },
    mode: "onChange",
  });
  async function resendCode(email: string) {
    setResetCodeLoading(true);
    const res = await forgotPass(email);
    if (res?.statusMsg == "success") {
      console.log(res);
      toast.success(res.message, {
        richColors: true,
        position: "top-right",
      });
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
    setResetCodeLoading(false);
  }
  async function onSubmit(data: CodeForm) {
    setLoading(true);
    const res = await forgotPassVerifyCode(data);
    if (res?.status == "Success") {
      console.log(res);
      setLoading(false);
      toast.success("code verified successfully", {
        richColors: true,
        position: "top-right",
      });
      router.push(`/ResetPassword/${encodeURIComponent(email)}`);
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

    // console.log(data);
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
          Check Your Email
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          <span>Enter the 6-digit code sent to {email}</span>
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-10 h-10 rounded-full shadow-lg shadow-[#16A34A40] bg-[#16A34A] flex items-center justify-center">
          <IoMdMail className="text-white" size={16} />
        </div>
        <div className="w-16 h-0.5 bg-[#16A34A]  shadow-[#16A34A40]" />
        <div className="w-10 h-10 rounded-full shadow-[#16A34A40] bg-[#16A34A]  flex items-center justify-center">
          <FaKey className="text-white" size={13} />
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
            Verification Code
          </Label>
          <Controller
            name="resetCode"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <FaShieldAlt
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  {...field}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  autoComplete="off"
                  placeholder="• • • • • •"
                  className="pl-9 h-11 rounded-xl border-gray-200 tracking-[0.5em] text-center text-lg"
                />
              </div>
            )}
          />
          {errors.resetCode && (
            <p className="text-red-500 text-xs">{errors.resetCode.message}</p>
          )}
        </div>
        <div className="flex items-center justify-center text-[14px] text-[#6A7282]">
          Didn't receive the code?{" "}
          <button
            onClick={() => resendCode(email)}
            disabled={resetCodeLoading}
            className="text-sm cursor-pointer text-[#16A34A] hover:text-[#157438] flex items-center justify-center gap-1 transition flex items-center"
          >
            {resetCodeLoading ? <Spinner /> : <span>Resend Code </span>}
          </button>
        </div>
        <Button
          disabled={loading}
          type="submit"
          className="w-full h-12 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-xl font-semibold cursor-pointer transition duration-200"
        >
          {loading ? <BeatLoader color="#40ff05" /> : <span> Verify Code</span>}
        </Button>
      </form>

      <Link
        href={"/forgotpassword"}
        className="text-center text-sm text-gray-500 mt-6 flex items-center justify-center cursor-pointer hover:text-[#16A34A] transition"
      >
        <IoIosArrowRoundBack className="text-xl" /> Change email address
      </Link>
    </div>
  );
}
