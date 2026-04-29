"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCheck, FaLock } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import BeatLoader from "react-spinners/esm/BeatLoader";
import { toast } from "sonner";
import { z } from "zod";
import { resetPassword } from "../_action/ForgotPassword";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    rePassword: z.string(),
  })
  .refine((d) => d.password === d.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });
type PasswordForm = z.infer<typeof passwordSchema>;

export default function ForgotPasswordReset({ email }: { email: string }) {
  console.log(email);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", rePassword: "" },
  });

  async function onSubmit(data: PasswordForm) {
    // console.log(data);
    setLoading(true);
    const res = await resetPassword(email, data.password);
    if (res?.token) {
      toast.success("password reset successfully", {
        richColors: true,
        position: "top-right",
      });
      setLoading(false);
      router.push(`/login`);
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
          Create New Password
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Your new password must be different from previous passwords
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-10 h-10 rounded-full shadow-lg shadow-[#16A34A40] bg-[#16A34A] flex items-center justify-center">
          <FaCheck className="text-white" size={13} />
        </div>
        <div className="w-16 h-0.5 bg-[#16A34A]" />
        <div className="w-10 h-10 rounded-full shadow-lg shadow-[#16A34A40] bg-[#16A34A] flex items-center justify-center">
          <FaCheck className="text-white" size={13} />
        </div>
        <div className="w-16 h-0.5 bg-[#16A34A]" />
        <div className="w-10 h-10 rounded-full shadow-lg shadow-[#16A34A40] bg-[#16A34A] flex items-center justify-center">
          <FaLock className="text-white" size={13} />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* New Password */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-gray-700">
            New Password
          </Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <FaLock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={13}
                />
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  className="pl-9 pr-10 h-11 rounded-xl border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                </button>
              </div>
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-gray-700">
            Confirm Password
          </Label>
          <Controller
            name="rePassword"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <FaLock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={13}
                />
                <Input
                  {...field}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  className="pl-9 pr-10 h-11 rounded-xl border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  tabIndex={-1}
                >
                  {showConfirm ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                </button>
              </div>
            )}
          />
          {errors.rePassword && (
            <p className="text-red-500 text-xs">{errors.rePassword.message}</p>
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
            <span>Reset Password</span>
          )}
        </Button>
      </form>
    </div>
  );
}
