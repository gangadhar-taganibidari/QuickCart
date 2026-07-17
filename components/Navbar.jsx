"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useClerk, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { assets, CartIcon, BagIcon } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";

const Navbar = () => {
  const { isSeller, router } = useAppContext();
  const { openSignIn } = useClerk();

  return (
    <nav className="flex items-center justify-between px-4 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">

      {/* Logo */}
      <Image
        src={assets.logo}
        alt="logo"
        width={130}
        height={40}
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        <Link href="/">Home</Link>
        <Link href="/all-products">Shop</Link>
        <Link href="/">About Us</Link>
        <Link href="/">Contact</Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        <Image
          src={assets.search_icon}
          alt="search"
          width={18}
          height={18}
          className="cursor-pointer"
        />

        <SignedOut>
          <button
            onClick={() => openSignIn()}
            className="flex items-center gap-2"
          >
            <Image
              src={assets.user_icon}
              alt="user"
              width={20}
              height={20}
            />
            <span>Account</span>
          </button>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>

             

              <UserButton.Link
                label="Cart"
                href="/cart"
                labelIcon={<CartIcon />}
              />

              <UserButton.Link
                label="My Orders"
                href="/my-orders"
                labelIcon={<BagIcon />}
              />

            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>

      </div>
    </nav>
  );
};

export default Navbar;