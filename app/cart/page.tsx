"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStore } from "@/store/store";
import { Trash } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { Order } from "@/typing";
import { Carattere } from "next/font/google";

const Cart: React.FC = () => {
  const [cart, setCart] = useStore((state) => [state.cart, state.setCart]); // store cart items
  const { user } = useUser();

  //remove item from cart
  const removeItem = (item: Order) => {
    const tempCart = cart.filter(
      (sneaker: Order) => sneaker.order_id !== item.order_id,
    );

    setCart(tempCart);
    toast.success("Sneaker Removed");
  };

  {
    /* Stripe Payment Logic*/
  }

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  );

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Signin required for Payment");
      return;
    }
    const stripe = await stripePromise;

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item: cart,
        user: user,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        // if succcess it recieves a session id use to redirect to success page

        // after successful payment ass item from cart to firebase database
        const order = cart.map((item: any) => {
          return {
            name: item.name,
            image: item.image,
            price: item.price,
            size: item.size,
            description: item.description,
          };
        });

        await addDoc(collection(db, "users", user.id, "order"), {
          item: order,
          time: new Date(),
        });

        // finally redirect to confirm page
        stripe?.redirectToCheckout({ sessionId: data.id });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center">
      {cart.length === 0 ? (
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
          ></img>

          <p className="text-xl font-semibold">Your cart is empty</p>

          <p className="text-base text-zinc-500">
            looks like you have not added anything in your cart yet
          </p>

          <Link href={"/"}>
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="w-full">
          <div className="my-4 flex items-center px-2">
            <p className="flex-1 text-lg font-bold">
              Total : $
              {cart.reduce(
                (acc: number, sneaker: Order) => acc + sneaker.price,
                0,
              )}
            </p>
            <Button onClick={handleCheckout} className="flex justify-end">
              Checkout
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sneaker</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item: Order) => (
                <TableRow key={item.order_id}>
                  <TableCell>
                    <img
                      src={item.image[0]}
                      width={110}
                      height={110}
                      alt="sneaker"
                      loading="lazy"
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>UK {item.size}</TableCell>
                  <TableCell>$ {item.price}</TableCell>
                  <TableCell>
                    <Trash
                      onClick={() => removeItem(item)}
                      className="hover:cursor-pointer"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Cart;
