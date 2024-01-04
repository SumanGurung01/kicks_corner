"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { allSneakers } from "@/lib/sneaker";
import { useStore } from "@/store/store";
import { generateOrderId } from "@/method/method";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Sneaker } from "@/typing";

const Sneakers: React.FC = ({ params }: any) => {
  const [cart, setCart] = useStore((state) => [state.cart, state.setCart]); // store cart items

  const [selectedSneaker, setSelectedSneaker] = useState<Sneaker>({
    name: "",
    image: "",
    color: "",
    sizes: [],
    silhouette: "",
    description: "",
    price: 0,
    gender: [],
    id: 0,
  }); // selected sneakers
  const [size, setSize] = useState<number>(0); // size selected
  const [wishlist, setWishlist] = useState(false); // for adding in wishlist

  const addToCart = (selectedSneaker: Sneaker) => {
    // if size is not selected then return
    if (size === 0) {
      toast.error("Size Required");
      return;
    }

    setCart([
      ...cart,
      { ...selectedSneaker, order_id: generateOrderId(), size: size },
    ]);
    toast.success("Sneaker Added");
  };

  const addToWishlist = () => {
    toast.success(wishlist ? "Remove from Wishlist" : "Added to Wishlist");
    setWishlist(!wishlist);
  };

  useEffect(() => {
    // on initial load set selected sneaker by matching sneaker id
    allSneakers.forEach((sneaker) => {
      if (Number(params.sneaker_id) === sneaker.id) {
        setSelectedSneaker(sneaker);
      }
    });
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="flex max-w-[1200px] flex-col md:flex-row lg:w-3/4">
        <Image
          width={1000}
          height={1000}
          src={selectedSneaker.image}
          alt="sneaker"
          className="bg-zinc-100 md:w-1/2 lg:w-1/2 dark:bg-zinc-900"
        />

        <div className="m-2 md:ml-8 md:w-1/2 lg:w-1/2 dark:text-zinc-300">
          <h1 className="my-3 text-xl font-bold">
            {selectedSneaker.name.toUpperCase()}
          </h1>
          <p className="text-sm font-semibold text-zinc-500">
            {selectedSneaker.gender[0]} shoes
          </p>
          <p className="my-3 text-xl font-bold">$ {selectedSneaker.price}</p>
          <p className="text-base italic">
            Also includes all applicable duties
          </p>
          <Select
            onValueChange={(e: any) => {
              setSize(e);
            }}
          >
            <SelectTrigger className="my-5 w-full">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {selectedSneaker.sizes.map((size) => (
                  <SelectItem value={String(size)} key={generateOrderId()}>
                    UK {size}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            className="my-1 w-full"
            onClick={() => addToCart(selectedSneaker)}
          >
            Add to Cart
          </Button>
          <Button
            className="my-1 w-full"
            variant="outline"
            onClick={() => addToWishlist()}
          >
            {wishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </Button>
          <p className="my-2 text-lg font-semibold">Product Details</p>

          <div
            dangerouslySetInnerHTML={{ __html: selectedSneaker.description }}
            className="text-base"
          ></div>

          <p className="my-3 text-base">Color : {selectedSneaker.color}</p>
        </div>
      </div>
    </div>
  );
};

export default Sneakers;
