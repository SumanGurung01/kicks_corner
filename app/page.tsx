"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { allSneakers, countSilhouettes } from "@/lib/sneaker";
import Link from "next/link";
import CarouselDemo from "@/components/banner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sneaker } from "@/typing";
import { generateOrderId } from "@/method/method";

const Home: React.FC = () => {
  const [sneakers, setSneakers] = useState<Sneaker[]>([]); // store all sneakers

  const [catagory, setCatagory] = useState<string>("All Sneakers"); // store selected catagory

  const sneakerCatagory = countSilhouettes(allSneakers); // returns the catagory based on silhouettes

  useEffect(() => {
    // if all sneakers set senakers to all sneakers
    if (catagory === "All Sneakers") {
      setSneakers(allSneakers);
    } else {
      // filter sneakers based on selected catagory
      const filterSneaker = allSneakers.filter(
        (sneaker) => sneaker.silhouette === catagory,
      );

      setSneakers(filterSneaker);
    }
  }, [catagory]);

  return (
    <div className="flex flex-col items-center justify-center">
      <CarouselDemo />

      <br></br>

      <p className="text-xl font-bold dark:text-zinc-300">
        Find the latest Sneakers
      </p>

      <p className="font-semibold dark:text-zinc-500">explore our collection</p>

      <br></br>

      <Select
        onValueChange={(e) => {
          setCatagory(e);
        }}
      >
        <SelectTrigger className="my-5 w-[300px]">
          <SelectValue placeholder="Sneakers Catagory" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value={"All Sneakers"}>All Sneakers</SelectItem>

            {Object.keys(sneakerCatagory).map((catagory) => (
              <SelectItem value={catagory} key={generateOrderId()}>
                {catagory} - ({sneakerCatagory[catagory]})
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <br></br>

      <main className="flex w-11/12 max-w-[1200px] flex-wrap justify-center md:w-3/4 dark:text-zinc-300">
        {sneakers.map((sneaker: any) => {
          return (
            <Link
              href={`/sneaker/${sneaker.id}`}
              className="m-5 w-[320px] duration-300 hover:cursor-pointer"
              key={generateOrderId()}
            >
              <Image
                src={sneaker.image}
                alt="sneaker image"
                width={320}
                height={320}
                className="bg-zinc-100 duration-300 hover:scale-105 dark:bg-zinc-900"
              />
              <p className="my-2 text-sm font-bold">
                {sneaker.name.toUpperCase()}
              </p>
              <p className="text-sm font-semibold text-zinc-500">
                $ {sneaker.price}
              </p>
            </Link>
          );
        })}
      </main>
    </div>
  );
};

export default Home;
