import { supabase } from "@/app/supabaseClient";
import { headers } from "next/headers";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { User } from "@/types";

const SK = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(SK || "");

export async function GET() {
  console.log("paul innocent");

  return NextResponse.json({ name: "Paul Innocent" });
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 400 }
    );
  }

  const subscription: any = event.data.object;
  if (subscription?.object === "subscription") {
    // console.log("subscription");
    // console.log(subscription);
    // console.log(event.type);
    // console.log(" ");
    // console.log(" ");

    const { error } = await supabase
      .from("users")
      .update({
        stripeSubscriptionId: subscription.id,
        subscription_status: subscription.status,
        isSubscribed: (subscription.status === "active" || subscription.status === "trialing") ? true : false,
        updatedAt: new Date(),
      })
      // } as Partial<User>)
      .eq("stripeCustomerId", subscription.customer);

    if (error) {
      return new Response(null, { status: 404 });
    }
    return new Response(null, { status: 200 });
  }

  return new Response(`Webhook Error: ${"Unknown Event"}`, { status: 400 });
}
