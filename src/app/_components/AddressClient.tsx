"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { FaLocationDot } from "react-icons/fa6";
import {
  AddressFormData,
  addressSchema,
} from "../profile/addresses/ProfileAddress.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { addAddress, removeAddress } from "../_action/Address.action";
import { toast } from "sonner";
import { GetUserAddressType } from "@/types/ProfileAddress.type";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaPhoneAlt, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import BeatLoader from "react-spinners/esm/BeatLoader";
export default function AddressClient({
  addresses,
}: {
  addresses: GetUserAddressType | null;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [addLoading, setAddLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
  });
  async function onSubmit(data: AddressFormData) {
    setAddLoading(true);
    const res = await addAddress(data);
    if (res) {
      console.log(res);
      toast.success(res.message, {
        richColors: true,
        position: "top-right",
      });
      reset();
      setOpen(false);
      router.refresh();
    } else {
      toast.error("Something went wrong ", {
        richColors: true,
        position: "top-left",
      });
    }
    setAddLoading(false);
  }
  async function handleDelete(addressId: string) {
    setDeletingId(addressId);
    const res = await removeAddress(addressId);
    if (res) {
      console.log(res);
      toast.success(res.message, {
        richColors: true,
        position: "top-right",
      });
      router.refresh();
    } else {
      toast.error("Something went wrong ", {
        richColors: true,
        position: "top-left",
      });
    }
    setDeletingId(null);
  }
  return (
    <>
      {" "}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">My Addresses</h1>
          <p className="text-sm font-normal leading-5 text-[#6A7282]">
            Manage your saved delivery addresses
          </p>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="bg-green-600 shadow-md shadow-[#16A34A40] hover:bg-green-700 transition duration-200 text-white font-semibold rounded-xl h-10 md:h-11 md:w-40 flex items-center justify-center gap-1 cursor-pointer"
        >
          <Plus size={18} />
          Add Address
        </Button>
        {/* Modal */}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Add New Address
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            {/* Address Name */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Address Name
              </Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="e.g. Home, Office"
                    className="rounded-xl border-gray-200 h-11"
                    autoComplete="name"
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            {/* Full Address */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Full Address
              </Label>
              <Controller
                name="details"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Street, building, apartment..."
                    className="rounded-xl border-gray-200 resize-none min-h-[90px]"
                    autoComplete="street-address"
                  />
                )}
              />
              {errors.details && (
                <p className="text-red-500 text-xs">{errors.details.message}</p>
              )}
            </div>

            {/* Phone + City */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="01xxxxxxxxx"
                      className="rounded-xl border-gray-200 h-11"
                      autoComplete="tel"
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700">
                  City
                </Label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Cairo"
                      className="rounded-xl border-gray-200 h-11"
                      autoComplete="address-level2"
                    />
                  )}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs">{errors.city.message}</p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl h-12 font-semibold text-gray-700 border-gray-200"
                  onClick={() => reset()}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={addLoading}
                type="submit"
                className="rounded-xl h-12 font-semibold bg-green-600 hover:bg-green-700 text-white shadow-md shadow-[#16A34A40] cursor-pointer"
              >
                {addLoading ? (
                  <BeatLoader color="#65f714" />
                ) : (
                  <span>Add Address</span>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {addresses?.data && addresses.data.length > 0 ? (
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 "}>
          {addresses?.data?.map((address) => (
            <Card className="rounded-2xl border border-[#F3F4F6]! hover:shadow-md hover:shadow-green-100 transition-all duration-200">
              <CardContent className="flex items-start justify-between lg:py-0 p-4 gap-2">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] flex items-center justify-center shrink-0">
                    <FaLocationDot className="text-[#16A34A]" size={18} />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">
                      {address.name}
                    </p>
                    <p className="text-sm text-[#4A5565] truncate">
                      {address.details}
                    </p>
                    <div className="flex items-center gap-3 text-[#6A7282] text-xs flex-wrap">
                      <span className="flex items-center gap-1">
                        <FaPhoneAlt size={12} />
                        {address.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiOutlineBuildingOffice2 size={13} />
                        {address.city}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl w-9 h-9 border-none text-gray-500 bg-gray-200 cursor-pointer hover:bg-[#DCFCE7] hover:text-[#16A34A] transition duration-200"
                  >
                    <MdEdit size={15} />
                  </Button>

                  <Button
                    disabled={deletingId === address._id}
                    onClick={() => handleDelete(address._id)}
                    variant="outline"
                    size="icon"
                    className={`${
                      deletingId === address._id
                        ? "rounded-xl w-9 h-9 border-none text-gray-300 bg-gray-100"
                        : "rounded-xl w-9 h-9 border-none text-gray-500 bg-gray-200 cursor-pointer hover:bg-[#FFE2E2] hover:text-[#E7000B] transition duration-200"
                    }`}
                  >
                    <FaTrash size={15} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="rounded-2xl">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <FaLocationDot className="text-gray-500" size={28} />
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              No Addresses Yet
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-500 max-w-md mb-6">
              Add your first delivery address to make checkout faster and
              easier.
            </p>

            {/* Button */}
            <Button
              onClick={() => setOpen(true)}
              className="bg-green-600 h-11 hover:bg-green-700 transition duration-200 cursor-pointer text-white font-semibold rounded-xl px-6 py-2 flex items-center gap-2 shadow-md"
            >
              <Plus size={18} />
              Add Your First Address
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
