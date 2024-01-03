import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

async function page() {
  const { userId } = auth();

  // fetch orders from firebase database
  const data = await getDocs(collection(db, "users", userId!, "order"));

  // data recieved from database cannot be used directly . it need to be processed like this
  const orders = data.docs.map((doc: any) => ({
    item: doc.data().item,
    time: new Date(doc.data().time?.seconds * 1000) || undefined,
  }));

  return (
    <div className="flex justify-center">
      <div className="md:w-11/12 lg:w-3/4">
        {orders.length === 0 ? (
          <div className="mt-36 flex flex-col items-center justify-center gap-10">
            <Image
              src={
                "https://www.pngkey.com/png/full/16-161785_sad-face-in-rounded-square-comments-cartoon-sad.png"
              }
              width={100}
              height={100}
              alt="empty cart"
              className="dark:invert"
            />

            <p className="text-xl font-semibold">Your order list is empty</p>
            <p className="text-base text-zinc-500">
              looks like you have not ordered anything yet
            </p>

            <Link href={"/"}>
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order: object, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {order.item.map((sneaker) => (
                      <div className="flex items-center">
                        <img src={sneaker.image} className="mr-3 h-20 w-20" />
                        <p>
                          {sneaker.name} - ${sneaker.price}
                        </p>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{order.time.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default page;
