"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MdLock } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  ChangePasswordInfo,
  changePasswordSchema,
} from "../profile/settings/ProfileSettingsPass.shema";
import { FaLock } from "react-icons/fa";
import { updateLoggedUserPassword } from "../_action/ProfileAuth";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { signOut } from "next-auth/react";
import { clearUserCookies } from "../_action/clearUserCookies";

export default function ProfileFormSettingsPass() {
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const form = useForm<ChangePasswordInfo>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });
  async function logOutHandler() {
    await clearUserCookies();
    signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  }

  async function onSubmit(data: ChangePasswordInfo) {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const res = await updateLoggedUserPassword(data);
    if (res) {
      if (res.statusMsg == "fail") {
        setSuccess(null);
        setError(res.message || "Something went wrong");
      } else if (res.message == "success") {
        setError(null);
        setSuccess("Password Updated Successfully");
        form.reset();
        toast.success("Password changed successfully. Please login again.", {
          position: "top-left",
          richColors: true,
        });
        setTimeout(() => {
          logOutHandler();
        }, 1500);
      }
      // console.log(res);
    } else {
      setSuccess(null);
      setError("something went wrong");
      toast.error("something went wrong", {
        position: "bottom-left",
        richColors: true,
      });
    }
    setLoading(false);
  }

  return (
    <Card className="w-full shadow-md border! border-[#F3F4F6]!">
      <CardHeader className="pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#FEF3C6] flex items-center justify-center shrink-0">
            <FaLock className="w-6 h-6 text-[#E17100]" />
          </div>
          <div>
            <p className="text-base font-bold text-gray-900">Change Password</p>
            <p className="text-sm text-gray-500">
              Update your account password
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="">
        {error && (
          <div className="p-4 bg-[#FEF2F2] mb-5 rounded-xl border border-[#FFD4D4] text-[#C11E2D]">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-[#F0FDF4] mb-5 rounded-xl border border-green-300 text-green-700">
            {success}
          </div>
        )}
        <form id="change-password-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-2">
            {/* Current Password */}
            <Controller
              name="currentPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="current-password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Current Password
                  </FieldLabel>
                  <div className="relative mt-1">
                    <Input
                      {...field}
                      id="current-password"
                      type={showCurrent ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your current password"
                      autoComplete="current-password"
                      className="pr-10  h-12 rounded-[12px] border! border-[#E5E7EB]!"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent((v) => !v)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showCurrent ? (
                        <HiEyeOff className="w-5 h-5" />
                      ) : (
                        <HiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* New Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="new-password"
                    className="text-sm font-medium text-gray-700"
                  >
                    New Password
                  </FieldLabel>
                  <div className="relative mt-1">
                    <Input
                      {...field}
                      id="new-password"
                      type={showNew ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your new password"
                      autoComplete="new-password"
                      className="pr-10  h-12 rounded-[12px] border! border-[#E5E7EB]!"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((v) => !v)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showNew ? (
                        <HiEyeOff className="w-5 h-5" />
                      ) : (
                        <HiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <FieldDescription className="text-xs text-gray-400 mt-1">
                    Must be at least 6 characters
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Confirm New Password */}
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="confirm-password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </FieldLabel>
                  <div className="relative mt-1">
                    <Input
                      {...field}
                      id="confirm-password"
                      type={showConfirm ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder="Confirm your new password"
                      autoComplete="new-password"
                      className="pr-10  h-12 rounded-[12px] border! border-[#E5E7EB]!"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirm ? (
                        <HiEyeOff className="w-5 h-5" />
                      ) : (
                        <HiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* Submit Button */}
          <div className="mt-6">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#E17100] hover:bg-orange-700 cursor-pointer w-40 h-12 rounded-[12px] shadow-md shadow-[#E1710040] text-white gap-2 px-6 flex items-center justify-center"
            >
              {loading ? <Spinner /> : <FaLock className="w-4 h-4" />}

              {loading ? (
                <span>Changing....</span>
              ) : (
                <span>Change Password</span>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
