"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductType } from "@/types/Product.type";
import { FaCheck, FaShieldAlt, FaStar, FaTruck } from "react-icons/fa";
import { MdOutlineRateReview, MdShield } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";
import { BsBoxSeam } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import Rating from "./Rating";
import { toast } from "sonner";
import {
  createReviewForProduct,
  getProductReviews,
} from "../_action/Review.action";
import BeatLoader from "react-spinners/esm/BeatLoader";
export default function NavAndTabsProduct({
  product,
}: {
  product: ProductType | null;
}) {
  const [reviews, setReviews] = useState(product?.reviews ?? []);
  const [ratingsAverage, setRatingsAverage] = useState(
    product?.ratingsAverage ?? 0,
  );
  const [ratingsQuantity, setRatingsQuantity] = useState(
    product?.ratingsQuantity ?? 0,
  );
  const [reviewOpen, setReviewOpen] = useState(false);
  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [starQuant, setStarQuant] = useState(0);
  const [isReviewLoading, setIsReviewLoading] = useState(false);
  // calculate star percentages from reviews
  // console.log(reviews);
  async function fetchReviews() {
    const res = await getProductReviews(product?._id ?? "");
    if (res) {
      setReviews(res);
      setRatingsQuantity(res.length);
      const avg =
        res.length > 0
          ? parseFloat(
              (res.reduce((sum, r) => sum + r.rating, 0) / res.length).toFixed(
                1,
              ),
            )
          : 0;
      setRatingsAverage(avg);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  const starCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percent:
      reviews.length > 0
        ? Math.round(
            (reviews.filter((r) => r.rating === star).length / reviews.length) *
              100,
          )
        : 0,
  }));
  async function reviewHandler() {
    const review = reviewRef.current?.value;

    if (!review || review.trim() === "") {
      toast.error("Please write a review", {
        position: "top-left",
        richColors: true,
      });
      return;
    }
    if (starQuant === 0) {
      toast.error("Please select a star rating", {
        position: "top-left",
        richColors: true,
      });
      return;
    }

    setIsReviewLoading(true);
    try {
      const res = await createReviewForProduct(product?._id ?? "", {
        review,
        rating: starQuant,
      });

      if (res === null) {
        toast.error("Something went wrong", {
          position: "top-left",
          richColors: true,
        });
        return;
      }
      if ("noToken" in res) {
        toast.error("You must be logged in to write a review", {
          position: "top-left",
          richColors: true,
        });
        router.push("/login");
        return;
      }
      if ("errors" in res) {
        toast.error(res.errors.msg, { position: "top-left", richColors: true });
        return;
      }

      toast.success("Review submitted successfully", {
        position: "top-right",
        richColors: true,
      });
      setReviewOpen(false);
      setStarQuant(0);
      if (reviewRef.current) reviewRef.current.value = "";
      await fetchReviews();
    } finally {
      setIsReviewLoading(false);
    }
  }
  function starHandler(starNum: number) {
    setStarQuant(starNum);
    // console.log(starNum);
  }
  return (
    <Tabs defaultValue="details" className="mt-12">
      {/* ── Tab Triggers ── */}
      <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start gap-6 rounded-none h-auto pb-0 px-0">
        <TabsTrigger
          value="details"
          className="pb-3 pt-4 px-1 cursor-pointer rounded-none border-b-2 border-transparent  data-[state=active]:border-b-[#07b638] data-[state=active]:bg-[#F7FEF9] data-[state=active]:text-[#16A34A] text-gray-500 font-medium text-sm bg-transparent shadow-none flex items-center gap-1.5"
        >
          <BsBoxSeam size={14} /> Product Details
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="pb-3 pt-4  px-1 cursor-pointer rounded-none border-b-2 border-transparent data-[state=active]:border-b-[#07b638] data-[state=active]:bg-[#F7FEF9] data-[state=active]:text-[#16A34A] text-gray-500 font-medium text-sm bg-transparent shadow-none flex items-center gap-1.5"
        >
          <FaStar size={13} /> Reviews ({ratingsQuantity})
        </TabsTrigger>
        <TabsTrigger
          value="shipping"
          className="pb-3 pt-4  px-1 cursor-pointer rounded-none border-b-2 border-transparent data-[state=active]:border-b-[#07b638] data-[state=active]:bg-[#F7FEF9] data-[state=active]:text-[#16A34A] text-gray-500 font-medium text-sm bg-transparent shadow-none flex items-center gap-1.5"
        >
          <FaTruck size={13} /> Shipping & Returns
        </TabsTrigger>
      </TabsList>

      {/* ── Product Details ── */}
      <TabsContent value="details">
        <div className="border border-gray-100 rounded-2xl p-6 mt-4">
          <h3 className="font-bold text-gray-900 mb-2">About this Product</h3>
          <p className="text-sm text-gray-500 mb-6">{product?.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Info */}
            <div className="bg-[#F9FAFB] rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                Product Information
              </h4>
              <div className="space-y-2">
                {[
                  { label: "Category", value: product?.category?.name },
                  {
                    label: "Subcategory",
                    value: product?.subcategory?.[0]?.name,
                  },
                  { label: "Brand", value: product?.brand?.name },
                  { label: "Items Sold", value: `${product?.sold}+ sold` },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-semibold text-gray-700">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-[#F9FAFB] rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                Key Features
              </h4>
              <div className="space-y-2">
                {[
                  "Premium Quality Product",
                  "100% Authentic Guarantee",
                  "Fast & Secure Packaging",
                  "Quality Tested",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <FaCheck className="text-[#16A34A] shrink-0" size={12} />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* ── Reviews ── */}
      <TabsContent value="reviews">
        <div className="border border-gray-100 rounded-2xl p-6 mt-4">
          {/* Rating Summary */}
          <div className="flex items-start gap-8 pb-6 border-b border-gray-100 mb-6">
            {/* Score */}
            <div className="flex flex-col items-center shrink-0">
              <span className="text-5xl font-black text-gray-900">
                {ratingsAverage}
              </span>
              <div className="flex items-center gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <FaStar
                    key={s}
                    size={14}
                    className={
                      s <= Math.round(ratingsAverage)
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400 mt-1">
                Based on {ratingsQuantity} reviews
              </span>
            </div>

            {/* Bars */}
            <div className="flex-1 space-y-2">
              {starCounts.map(({ star, percent }) => (
                <div
                  key={star}
                  className="flex items-center gap-3 text-xs text-gray-500"
                >
                  <span className="w-10 shrink-0">{star} star</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-right">{percent}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review List or Empty */}
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="w-9 h-9 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-[#16A34A]">
                      {review.user.name[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {review.user.name}
                      </p>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <FaStar
                            key={s}
                            size={11}
                            className={
                              s <= review.rating
                                ? "text-yellow-400"
                                : "text-gray-200"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{review.review}</p>
                    <p className="text-xs text-gray-300 mt-1">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <FaStar className="text-gray-200" size={40} />
              <p className="text-sm text-gray-500">
                Customer reviews will be displayed here.
              </p>
            </div>
          )}

          <button
            onClick={() => setReviewOpen(true)}
            className="text-sm text-[#16A34A] cursor-pointer hover:underline font-medium"
          >
            Write a Review
          </button>

          <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
            <DialogContent className="sm:max-w-md rounded-2xl p-6">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-gray-900">
                  Write a Review
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                {/* Star Rating */}
                <div className="space-y-1.5">
                  <p className="text-sm font-medium text-gray-700">
                    Your Rating
                  </p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} onClick={() => starHandler(s)}>
                        <FaStar
                          size={24}
                          className={`cursor-pointer transition ${
                            s <= starQuant
                              ? "text-yellow-500"
                              : "text-gray-200 hover:text-yellow-400"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Review Text */}
                <div className="space-y-1.5">
                  <p className="text-sm font-medium text-gray-700">
                    Your Review
                  </p>
                  <Textarea
                    ref={reviewRef}
                    placeholder="Share your experience with this product..."
                    className="rounded-xl border-gray-200 resize-none min-h-[120px]"
                  />
                </div>
                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-xl h-11 font-semibold text-gray-700 border-gray-200"
                    onClick={() => setReviewOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={reviewHandler}
                    type="button"
                    disabled={isReviewLoading}
                    className="rounded-xl h-11 font-semibold bg-[#16A34A] hover:bg-[#15803D] text-white"
                  >
                    {isReviewLoading ? (
                      <BeatLoader color="white" size={8} />
                    ) : (
                      "Submit Review"
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </TabsContent>

      {/* ── Shipping & Returns ── */}
      <TabsContent value="shipping">
        <div className="border border-gray-100 rounded-2xl p-6 mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Shipping */}
            <div className="bg-[#F0FDF4] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#16A34A] flex items-center justify-center shrink-0">
                  <FaTruck className="text-white" size={15} />
                </div>
                <h4 className="font-bold text-gray-900">
                  Shipping Information
                </h4>
              </div>
              <div className="space-y-2">
                {[
                  "Free shipping on orders over $50",
                  "Standard delivery: 3-5 business days",
                  "Express delivery available (1-2 business days)",
                  "Track your order in real-time",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <FaCheck className="text-[#16A34A] shrink-0" size={11} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Returns */}
            <div className="bg-[#F0FDF4] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#16A34A] flex items-center justify-center shrink-0">
                  <IoMdRefresh className="text-white" size={18} />
                </div>
                <h4 className="font-bold text-gray-900">Returns & Refunds</h4>
              </div>
              <div className="space-y-2">
                {[
                  "30-day hassle-free returns",
                  "Full refund or exchange available",
                  "Free return shipping on defective items",
                  "Easy online return process",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <FaCheck className="text-[#16A34A] shrink-0" size={11} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Buyer Protection */}
          <div className="flex items-start gap-4 border border-gray-100 rounded-xl p-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
              <FaShieldAlt className="text-gray-500" size={18} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-0.5">
                Buyer Protection Guarantee
              </p>
              <p className="text-sm text-gray-500">
                Get a full refund if your order doesn't arrive or isn't as
                described. We ensure your shopping experience is safe and
                secure.
              </p>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
