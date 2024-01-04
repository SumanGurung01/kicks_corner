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
          images: [sneaker.image],
          name: sneaker.name,
          description: sneaker.desceiption,
        },
        unit_amount: sneaker.price * 100,
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: extractingItems,
      mode: "payment",
      success_url: "https://kicks-corner.vercel.app/confirm",
      cancel_url: "https://kicks-corner.vercel.app/cart",
      metadata: {
        user: user.fullName,
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    return NextResponse.json({ message: err.message });
  }
};
