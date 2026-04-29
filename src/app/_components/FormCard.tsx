"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaFacebook, FaGoogle, FaUserPlus } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { toast } from "sonner";
import { signUpAction } from "../(auth)/signup/signup.action";
import { formDataType, signUpSchema } from "../(auth)/signup/signup.type";
import BeatLoader from "./../../../node_modules/react-spinners/esm/BeatLoader";
export default function FormCard() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<formDataType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });
  async function onSubmit(data: formDataType) {
    setIsLoading(true);
    try {
      const res = await signUpAction(data);

      if (res?.success) {
        toast.success("Account has been created.", {
          position: "top-left",
          richColors: true,
        });
        setTimeout(() => router.push("/login"), 2000);
      } else {
        toast.error(res?.data?.message, {
          position: "top-left",
          richColors: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }
  const [isShown, setIsShown] = React.useState(false);
  function showPassword() {
    setIsShown(!isShown);
  }

  function getPasswordStrength(password: string) {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  }

  function getStrengthLabel(strength: number) {
    if (strength === 0) return { label: "", color: "" };
    if (strength <= 25) return { label: "Weak", color: "bg-red-500" };
    if (strength <= 50) return { label: "Fair", color: "bg-orange-500" };
    if (strength <= 75) return { label: "Good", color: "bg-yellow-500" };
    return { label: "Strong", color: "bg-[#16A34A]" };
  }
  return (
    <>
      <div>
        <div className="w-full  rounded-[16px]  !border-0 !shadow-md !pt-5 p-3">
          <CardHeader className="text-center mb-5">
            <CardTitle className="text-3xl">Create Your Account</CardTitle>
            <CardDescription className="text-[16px] leading-none">
              Start your fresh journey with us today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 mb-5 gap-2">
              <Button className="col-span-1 w-full text-gray-800 bg-white border border-gray-300 cursor-pointer gap-2 p-3! hover:border-green-500 hover:bg-green-50">
                <FaGoogle className="text-[#E7000B]" />
                <span className="font-bold">Google</span>
              </Button>
              <Button className="col-span-1 w-full text-gray-800 bg-white border border-gray-300 cursor-pointer gap-2 p-3! hover:border-green-500 hover:bg-green-50">
                <FaFacebook className="text-[#155DFC]" />
                <span className="font-bold">Facebook</span>
              </Button>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-[#364153]">or</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>
            <form id="SignUp" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="mb-4">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name" className="text-[16px]">
                        Name <span className="text-red-600">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Your Name"
                        autoComplete="off"
                        className="py-5"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <FieldGroup className="mb-4">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email" className="text-[16px]">
                        Email <span className="text-red-600">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="example@gmail.com"
                        autoComplete="off"
                        className="py-5"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldGroup className="mb-4">
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="password" className="text-[16px]">
                        Password <span className="text-red-600">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          id="password"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your Password"
                          autoComplete="off"
                          type={isShown ? "text" : "password"}
                          className="py-5 pr-10"
                        />
                        <div
                          className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                          onClick={showPassword}
                        >
                          {isShown ? (
                            <HiEyeOff className="text-[#99A1AF] text-xl" />
                          ) : (
                            <HiEye className="text-[#99A1AF] text-xl" />
                          )}
                        </div>
                      </div>
                      {field.value && (
                        <div className="mt-2 space-y-1">
                          <Progress
                            value={getPasswordStrength(field.value)}
                            className="h-1.5"
                            indicatorClassName={
                              getStrengthLabel(getPasswordStrength(field.value))
                                .color
                            }
                          />
                          <p
                            className={`text-xs font-medium ${
                              getPasswordStrength(field.value) <= 25
                                ? "text-red-500"
                                : getPasswordStrength(field.value) <= 50
                                  ? "text-orange-500"
                                  : getPasswordStrength(field.value) <= 75
                                    ? "text-yellow-500"
                                    : "text-[#16A34A]"
                            }`}
                          >
                            {
                              getStrengthLabel(getPasswordStrength(field.value))
                                .label
                            }
                          </p>
                        </div>
                      )}
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <FieldGroup className="mb-4">
                <Controller
                  name="rePassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="rePassword" className="text-[16px]">
                        Confirm Password <span className="text-red-600">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="rePassword"
                        aria-invalid={fieldState.invalid}
                        placeholder="Confirm Your Password"
                        autoComplete="off"
                        type="password"
                        className="py-5"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <FieldGroup className="mb-7">
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="phone" className="text-[16px]">
                        Phone Number <span className="text-red-600">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="phone"
                        aria-invalid={fieldState.invalid}
                        placeholder="01012345678"
                        autoComplete="off"
                        className="py-5"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <FieldGroup className="w-full mb-6">
                <Controller
                  name="terms"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="terms-checkbox-basic"
                          checked={field.value}
                          onCheckedChange={(val) =>
                            field.onChange(val as boolean)
                          }
                          className="me-2"
                        />
                        <FieldLabel htmlFor="terms-checkbox-basic">
                          <span className="text-[16px]">
                            I agree to the{" "}
                            <Link href="/terms" className="text-[#16A34A]">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-[#16A34A]">
                              Privacy Policy
                            </Link>
                            <span className="text-red-700"> *</span>
                          </span>
                        </FieldLabel>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <FieldGroup>
                <Field orientation="horizontal">
                  {" "}
                  <Button
                    type="submit"
                    form="SignUp"
                    className="mb-5 w-full p-6 text-white bg-[#16A34A] cursor-pointer text-xl hover:bg-[#15803D] transition"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <BeatLoader color="white" />
                    ) : (
                      <div className="flex items-center gap-2 ">
                        <FaUserPlus /> <span>Submit</span>
                      </div>
                    )}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>

          <div className="rounded-2xl h-[1px] bg-gray-200 " />
          <div className="w-full flex items-center justify-center py-6">
            {" "}
            <span className="me-1">Already have an account? </span>
            <Link
              className="text-[#16A34A] hover:text-[#087d33] font-bold"
              href={"/login"}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
