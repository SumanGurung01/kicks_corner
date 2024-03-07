"use client";

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
import { cn } from "@/lib/utils";
import Recommended from "@/components/Recommended";

const Sneakers: React.FC = ({ params }: any) => {
  const [cart, setCart] = useStore((state) => [state.cart, state.setCart]); // store cart items

  const [selectedSneaker, setSelectedSneaker] = useState<Sneaker>({
    name: "",
    image: [],
    color: "",
    sizes: [],
    silhouette: "",
    description: "",
    price: 0,
    gender: [],
    id: 0,
    released: "",
    brand: "",
  }); // selected sneakers
  const [size, setSize] = useState<number>(0); // size selected
  const [wishlist, setWishlist] = useState(false); // for adding in wishlist
  const [imageIndex, setImageIndex] = useState(1); // for adding in wishlist

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
    <div className="mt-6 lg:mt-10">
      <div className="m-4 flex flex-col lg:flex-row xl:m-0">
        <div className="w-full object-cover lg:w-1/2">
          <img
            width={1000}
            height={1000}
            src={selectedSneaker.image[imageIndex]}
            alt="sneaker"
            className="rounded-lg"
            loading="lazy"
          />
          <div className="my-4 flex gap-2">
            <img
              width={100}
              height={100}
              src={selectedSneaker.image[1]}
              alt="sneaker"
              className={cn(
                imageIndex === 1 ? "" : "brightness-90 dark:opacity-50",
                "cursor-pointer rounded-lg",
              )}
              loading="lazy"
              onClick={() => setImageIndex(1)}
            />
            <img
              width={100}
              height={100}
              src={selectedSneaker.image[2]}
              alt="sneaker"
              className={cn(
                imageIndex === 2 ? "" : "brightness-90 dark:opacity-50",
                "cursor-pointer rounded-lg",
              )}
              loading="lazy"
              onClick={() => setImageIndex(2)}
            />
            <img
              width={100}
              height={100}
              src={selectedSneaker.image[3]}
              alt="sneaker"
              className={cn(
                imageIndex === 3 ? "" : "brightness-90 dark:opacity-50",
                "cursor-pointer rounded-lg",
              )}
              loading="lazy"
              onClick={() => setImageIndex(3)}
            />
          </div>
        </div>

        <div className="md:mx-4 lg:w-1/2 dark:text-zinc-300">
          <h1 className="mt-8 text-xl font-bold md:text-3xl lg:mt-0">
            {selectedSneaker.name}
          </h1>
          <p className="my-3 text-xl font-bold">$ {selectedSneaker.price}</p>
          <p className="text-base italic text-zinc-600 dark:text-zinc-300">
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

          <div className="flex gap-4">
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
          </div>

          <p className="mb-4 mt-6 text-lg font-semibold">Product Details</p>

          <div
            dangerouslySetInnerHTML={{ __html: selectedSneaker.description }}
            className="text-base"
          ></div>

          <p className="my-3 text-base">
            <span className="font-bold">Color</span> : {selectedSneaker.color}
          </p>
        </div>
      </div>

      <p className="m-4 mt-20 text-3xl font-bold md:text-4xl xl:m-0 xl:mt-32">
        Exclusive drops, steal deals & perks
      </p>
      <p className="m-4 text-lg text-zinc-600 md:my-4 md:text-xl xl:m-0 xl:my-4  dark:text-zinc-300">
        Corner for best sneakers at a lowest price than anywhere else.
        Guaranteed!
      </p>

      <p className="m-4 mt-20 text-xl font-bold md:text-2xl xl:m-0 xl:mt-20">
        You may also like these{" "}
        <span className="text-orange-500">Sneakers</span>.
      </p>
      <Recommended silhouette={selectedSneaker.silhouette} />
    </div>
  );
};

export default Sneakers;
