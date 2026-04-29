"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  formSchema,
  ProfileInfo,
} from "../profile/settings/ProfileSettings.Schema";
import { FaSave, FaUser } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { updateLoggedUserData } from "../_action/ProfileAuth";
import { toast } from "sonner";

export function ProfileFormSettings({
  UserId,
  userRole,
  userName,
}: {
  UserId: string | null;
  userRole: string | null;
  userName: string | null;
}) {
  const form = useForm<ProfileInfo>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: userName ?? "",
      email: "",
      phone: "",
    },
  });
  // const { data: session, update } = useSession();
  const { update } = useSession();

  async function onSubmit(data: ProfileInfo) {
    const res = await updateLoggedUserData(data);
    if (res) {
      if (res.message == "success") {
        toast.success("accout updated successfully", {
          position: "top-right",
          richColors: true,
        });
        form.reset({
          name: res.user.name,
          email: "",
          phone: "",
        });
        await update({ name: res.user.name });
      } else if (res.message == "fail") {
        toast.error(res.errors.msg, {
          position: "top-right",
          richColors: true,
        });
      }
    } else {
      toast.error("somthing went wrong", {
        position: "top-right",
        richColors: true,
      });
    }
    // console.log(res);
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Account Settings
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Update your profile information and change your password
        </p>
      </div>

      {/* Profile Information Card */}
      <Card className="w-full shadow-md border border-[#F3F4F6]!">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <FaUser className="text-[#16A34A]" />
            </div>
            <div>
              <CardTitle className="font-semibold text-gray-900">
                Profile Information
              </CardTitle>
              <CardDescription className="text text-gray-500">
                Update your personal details
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-2">
          <form
            id="profile-settings-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup className="space-y-2">
              {/* Full Name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="profile-name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="profile-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className="mt-1 h-12 rounded-[12px] border! border-[#E5E7EB]!"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Email Address */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="profile-email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </FieldLabel>
                    <Input
                      {...field}
                      id="profile-email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="mt-1 h-12 rounded-[12px] border! border-[#E5E7EB]!"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Phone Number */}
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="profile-phone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </FieldLabel>
                    <Input
                      {...field}
                      id="profile-phone"
                      type="tel"
                      aria-invalid={fieldState.invalid}
                      placeholder="01xxxxxxxxx"
                      autoComplete="tel"
                      className="mt-1 h-12 rounded-[12px] border! border-[#E5E7EB]!"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Save Button */}
            <div className="mt-6">
              <Button
                type="submit"
                form="profile-settings-form"
                className="bg-green-600 rounded-[12px] cursor-pointer hover:bg-green-700 text-white gap-2 w-40 h-12 shadow-md shadow-[#16A34A40]"
              >
                <FaSave />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>

        {/* Account Information Footer */}
        <CardFooter className="flex-col items-start gap-0 border-t border-gray-100 px-6 pt-5 pb-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            Account Information
          </h2>
          <div className="w-full divide-y divide-gray-100">
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-500">User ID</span>
              <span className="text-sm text-gray-700 font-mono">
                {UserId ?? "—"}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-500">Role</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                {userRole ?? "User"}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
