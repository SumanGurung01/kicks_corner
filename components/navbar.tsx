"use client";

import React from "react";
import ThemeToggler from "./theme-toggler";
import { ShoppingBag, List } from "lucide-react";
import { useStore } from "@/store/store";
import Link from "next/link";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar: React.FC = () => {
  // to display number of item in cart
  const [cart] = useStore((state) => [state.cart]); // store cart items

  return (
    <nav className="flex h-20 items-center justify-center">
      <div className="mx-2 flex w-full max-w-[1200px] items-center justify-between md:w-11/12 lg:w-3/4">
        <div>
          <Link href={"/"}>
            <img
              src="/logo.png"
              width={70}
              height={70}
              alt="logo"
              className="dark:invert"
              loading="lazy"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-5">
          <Link href={"/cart"}>
            <ShoppingBag />
            {cart.length !== 0 ? (
              <div className="absolute top-5 ml-4 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-xs text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900">
                {cart.length}
              </div>
            ) : null}
          </Link>
          <Link href={"/order"}>
            <List />
          </Link>
          <ThemeToggler />

          <UserButton afterSignOutUrl="/" />

          <SignedOut>
            <SignInButton afterSignInUrl="/" mode="modal" />
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
