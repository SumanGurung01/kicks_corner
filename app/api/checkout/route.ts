import { NextResponse, NextRequest } from "next/server";
import { Stripe } from "stripe";

export const POST = async (request: NextRequest, response: NextResponse) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  try {
    const reqBody = await request.json();

    const { item, user } = reqBody;

    const extractingItems = item.map((sneaker: any) => ({
      quantity: 1,
      price_data: {
        currency: "usd",
        product_data: {
          images: [sneaker.image[0]],
          name: sneaker.name,
          description: sneaker.description,
        },
        unit_amount: sneaker.price * 100,
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: extractingItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/confirm`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      metadata: {
        user: user.fullName,
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    return NextResponse.json({ message: err.message });
  }
};
