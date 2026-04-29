"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FaFacebook,
  FaGoogle,
  FaLock,
  FaStar,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { IoMail } from "react-icons/io5";
import { toast } from "sonner";
import { formDataInputType, logInSchema } from "../(auth)/login/login.schema";
import BeatLoader from "./../../../node_modules/react-spinners/esm/BeatLoader";
export default function LoginFormCard() {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShown, setIsShown] = React.useState(false);
  const router = useRouter();
  const form = useForm<formDataInputType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(logInSchema),
    mode: "onSubmit",
  });
  async function logInSubmit(data: formDataInputType) {
    // console.log(data);
    setIsLoading(true);

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/",
    });
    // console.log(res);
    if (res?.ok) {
      toast.success("login successfully.", {
        position: "top-left",
        richColors: true,
      });
      setIsLoading(false);
      router.push("/");
    } else {
      toast.error("incorect email or password", {
        position: "top-left",
        richColors: true,
      });
      setIsLoading(false);
    }
  }
  function showPassword() {
    setIsShown(!isShown);
  }
  return (
    <div>
      <div>
        <div className="w-full  rounded-[16px]  !border-0 !shadow !pt-5 p-3">
          <CardHeader className="text-center mb-5">
            <CardTitle className="text-3xl font-bold">
              <span className="text-[#16A34A]">Fresh</span>Cart
            </CardTitle>
            <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
            <CardDescription className="text-[16px] leading-none">
              Sign in to continue your fresh shopping experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 mb-5 gap-2">
              <Button className="col-span-1 w-full text-gray-800 bg-white border border-gray-300 cursor-pointer gap-2 p-4! hover:border-green-500 hover:bg-green-50">
                <FaGoogle className="text-[#E7000B]" />
                <span className=" text-[#364153]">Continue with Google</span>
              </Button>
              <Button className="col-span-1 w-full text-gray-800 bg-white border border-gray-300 cursor-pointer gap-2 p-4! hover:border-green-500 hover:bg-green-50">
                <FaFacebook className="text-[#155DFC]" />
                <span className="text-[#364153]">Continue with Facebook</span>
              </Button>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-[#6A7282] text-sm">
                OR CONTINUE WITH EMAIL
              </span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            <form id="logIn" onSubmit={form.handleSubmit(logInSubmit)}>
              <FieldGroup className="mb-4">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email" className="text-[16px]">
                        Email <span className="text-red-600">*</span>
                      </FieldLabel>
                      <div className="relative">
                        {" "}
                        <Input
                          {...field}
                          id="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="example@gmail.com"
                          autoComplete="off"
                          className="py-5 ps-10 "
                        />
                        <div className="absolute  top-1/2 -translate-y-1/2 left-3">
                          <IoMail className="text-[#99A1AF] text-xl" />
                        </div>
                      </div>
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
                        {" "}
                        <Input
                          {...field}
                          id="password"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your Password"
                          autoComplete="off"
                          type={isShown ? "text" : "password"}
                          className="py-5 ps-10 "
                        />
                        <div className="absolute  top-1/2 -translate-y-1/2 left-3">
                          <FaLock className="text-[#99A1AF] text-xl" />
                        </div>
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
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldGroup className="w-full mb-6">
                <Field orientation="horizontal">
                  <Checkbox
                    id="terms-checkbox-basic"
                    name="terms-checkbox-basic"
                    className="me-1"
                    checked={checked}
                    onCheckedChange={(val) => setChecked(val as boolean)}
                  />
                  <FieldLabel htmlFor="terms-checkbox-basic">
                    <span className="text-[16px] text-[#364153]">
                      Keep me signed in
                    </span>
                  </FieldLabel>
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field orientation="horizontal">
                  {" "}
                  <Button
                    type="submit"
                    form="logIn"
                    className="mb-5 w-full p-6 text-white bg-[#16A34A] cursor-pointer text-xl hover:bg-[#15803D] transition"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <BeatLoader color="white" />
                    ) : (
                      <div className="flex items-center gap-2">
                        <FaUserPlus /> <span>Submit</span>
                      </div>
                    )}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
          <div className="rounded-2xl h-[1px] bg-gray-200 mt-3" />
          <div className="w-full flex items-center justify-center py-6">
            {" "}
            <span className="me-1">New to FreshCart? </span>
            <Link
              className="text-[#16A34A] hover:text-[#087d33] font-bold"
              href={"/signup"}
            >
              Sign Up
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-[#6A7282]">
            <div className="flex items-center gap-1.5">
              <FaLock className="text-[#6A7282]" />
              <span className="text-[#6A7282]">SSL Secured</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaUsers className="text-[#6A7282]" />
              <span className="text-[#6A7282]">50K+ Users</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaStar className="text-[#6A7282]" />
              <span className="text-[#6A7282]">4.9 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
