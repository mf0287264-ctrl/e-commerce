"use client";
import { ProductType } from "@/types/Product.type";
import { wishlistLogsType } from "@/types/Wishlist.type";
import React, { createContext, ReactNode, useState } from "react";
interface wishlistContextType {
  wishlistCounter: number;
  setWishlistCounter: (value: number) => void;

  wishlistProducts: ProductType[] | undefined;
  setWishlistProducts: (value: ProductType[]) => void;
}

export const wishlistContext = createContext({} as wishlistContextType);
export default function WishlistContext({
  children,
  wishlistData,
}: {
  children: ReactNode;
  wishlistData: wishlistLogsType | null;
}) {
  // console.log(wishlistData);
  const [wishlistCounter, setWishlistCounter] = useState(
    wishlistData?.count ?? 0,
  );
  const [wishlistProducts, setWishlistProducts] = useState(wishlistData?.data);
  return (
    <wishlistContext.Provider
      value={{
        wishlistCounter,
        setWishlistCounter,
        wishlistProducts,
        setWishlistProducts,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
