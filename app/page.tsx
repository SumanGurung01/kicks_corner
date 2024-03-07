"use client";
import { useState } from "react";
import { allSneakers, countBrand, countSilhouettes } from "@/lib/sneaker";
import Link from "next/link";
import CarouselDemo from "@/components/Banner";
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
import Marquee from "@/components/Marquee";

const Home: React.FC = () => {
  const [sneakers, setSneakers] = useState<Sneaker[]>(allSneakers); // store all sneakers

  const sneakerCatagory = countSilhouettes(allSneakers); // returns the catagory based on silhouettes
  const sneakerBrand = countBrand(allSneakers); // returns the catagory based on brand

  function handleSelect(value: string, type: string) {
    if (type === "catagory") {
      if (value === "All Sneakers") {
        setSneakers(allSneakers);
        return;
      }

      const filterSneaker = allSneakers.filter(
        (sneaker) => sneaker.silhouette === value,
      );

      setSneakers(filterSneaker);
      return;
    }

    if (type === "brand") {
      if (value === "All Brands") {
        setSneakers(allSneakers);
        return;
      }

      const filterSneaker = allSneakers.filter(
        (sneaker) => sneaker.brand === value,
      );
      setSneakers(filterSneaker);
      return;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <CarouselDemo />

      <p className="mt-20 text-xl font-bold md:text-3xl dark:text-zinc-300">
        Find the latest <span className="text-orange-500">Sneakers</span>.
      </p>

      <p className="text-md mb-10 font-semibold md:text-xl dark:text-zinc-500">
        explore our collection
      </p>

      <Marquee />

      <div className="md: flex w-full flex-col  items-center justify-center md:flex-row md:gap-10">
        <Select
          onValueChange={(e) => {
            handleSelect(e, "catagory");
          }}
        >
          <SelectTrigger className="my-5 w-[300px]">
            <SelectValue placeholder="Catagory" />
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

        <Select
          onValueChange={(e) => {
            handleSelect(e, "brand");
          }}
        >
          <SelectTrigger className="my-5 w-[300px]">
            <SelectValue placeholder="Brands" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value={"All Brands"}>All Brands</SelectItem>

              {Object.keys(sneakerBrand).map((brand) => (
                <SelectItem value={brand} key={generateOrderId()}>
                  {brand} - ({sneakerBrand[brand]})
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <br></br>

      <main className="flex flex-wrap justify-around">
        {sneakers.map((sneaker: any) => {
          return (
            <Link
              href={`/sneaker/${sneaker.id}`}
              className="m-5 w-[320px] duration-300 hover:cursor-pointer"
              key={generateOrderId()}
            >
              <img
                src={sneaker.image[0]}
                alt="sneaker image"
                width={320}
                height={320}
                className="bg-zinc-100 duration-300 hover:scale-105 dark:bg-zinc-900"
                loading="lazy"
              />
              <p className="my-2 text-lg font-bold">{sneaker.name}</p>
              <p className="text-lg font-semibold text-zinc-500">
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
