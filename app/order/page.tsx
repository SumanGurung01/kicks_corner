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
import Link from "next/link";
import { OrderDatabase } from "@/typing";
import { generateOrderId } from "@/method/method";

const Order: React.FC = async () => {
  const { userId } = auth();

  // fetch orders from firebase database
  const data = await getDocs(collection(db, "users", userId!, "order"));

  // data recieved from database cannot be used directly . it need to be processed like this
  const orders: OrderDatabase[] = data.docs.map((doc: any) => ({
    item: doc.data().item,
    time: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
  }));

  return (
    <div className="flex justify-center">
      <div className="md:w-11/12 lg:w-3/4">
        {orders.length === 0 ? (
          <div className="mt-36 flex flex-col items-center justify-center gap-10">
            <img
              src={
                "https://www.pngkey.com/png/full/16-161785_sad-face-in-rounded-square-comments-cartoon-sad.png"
              }
              width={100}
              height={100}
              alt="empty cart"
              className="dark:invert"
              loading="lazy"
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order: OrderDatabase, index: number) => (
                <TableRow key={generateOrderId()}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {order.item.map((sneaker) => (
                      <div
                        className="flex items-center"
                        key={generateOrderId()}
                      >
                        <img
                          src={sneaker.image}
                          className="mr-3 h-20 w-20"
                          loading="lazy"
                        />
                        <p>
                          {sneaker.name} - ${sneaker.price}
                        </p>
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Order;
