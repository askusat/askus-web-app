import { supabase } from "@/app/supabaseClient";
import { headers } from "next/headers";
import Stripe from "stripe";

const SK =process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(SK || "");

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

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.userId) {
    return new Response(null, {
      status: 200,
    });
  }

  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  );

  console.log("subscription");
  console.log(subscription);
  console.log(event.type);
  console.log(' ');
  console.log(' ');

  await supabase
    .from("users")
    .update({
      stripeSubscriptionId: subscription.id,
      subscription_status: subscription.status,
      updatedAt: new Date(),
    })
    .eq("stripeCustomerId", subscription.customer);

  return new Response(null, { status: 200 });
}
