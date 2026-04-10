import { NextResponse } from "next/server";
import Stripe from "stripe";
import { findProduct } from "@/lib/products";

export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY is not set. See README." },
      { status: 500 }
    );
  }

  try {
    const { productId, lang } = (await req.json()) as {
      productId: string;
      lang: "en" | "zh";
    };
    const product = findProduct(productId);
    if (!product) {
      return NextResponse.json({ error: "Unknown product" }, { status: 404 });
    }

    const stripe = new Stripe(secretKey);
    const origin =
      req.headers.get("origin") ?? `http://localhost:3000`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: product.priceCents,
            product_data: {
              name: product.name[lang] ?? product.name.en,
              description: product.description[lang] ?? product.description.en,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/shop?status=success`,
      cancel_url: `${origin}/shop?status=cancelled`,
      locale: lang === "zh" ? "zh" : "en",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
