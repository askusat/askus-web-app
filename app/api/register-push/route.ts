
import { supabase } from "@/app/supabaseClient";
import { User } from "@/types";
import { NextResponse } from "next/server";

interface PushProps {
  subscription: PushSubscription;
  user: User;
}

export async function POST(req: Request) {
  const { subscription, user }: PushProps = await req.json();
  try {
    const newSubscription: PushSubscription | undefined = subscription;
    if (!newSubscription) {
      return NextResponse.json(
        { error: "Missing push subscription in body" },
        { status: 400 }
      );
    }
    // console.log("Received push subscription to add:", newSubscription);

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }
    const userSubscriptions = user.pushSubscriptions || [];
    const updatedsubscriptions: PushSubscription[] = userSubscriptions.filter(
      (subscription: PushSubscription) =>
        subscription.endpoint !== newSubscription.endpoint
    );
    updatedsubscriptions.push(newSubscription);
    const { error } = await supabase
      .from("users")
      .update({ pushSubscriptions: updatedsubscriptions })
      .eq("id", user?.id);

    if (error) {
      return NextResponse.json(
        { error: "Failed to update current user's pushSubscriptions list" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "push Subscription saved" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { subscription, user }: PushProps = await req.json();
  try {
    const subscriptionToDelete: PushSubscription | undefined = subscription;
    if (!subscriptionToDelete) {
      return NextResponse.json(
        { error: "Missing push subscription in body" },
        { status: 400 }
      );
    }
    // console.log("Received push subscription to delete:", subscriptionToDelete);

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }
    const userSubscriptions = user.pushSubscriptions || [];
    const updatedsubscriptions: PushSubscription[] = userSubscriptions.filter(
      (subscription: PushSubscription) =>
        subscription.endpoint !== subscriptionToDelete.endpoint
    );

    const { error } = await supabase
      .from("users")
      .update({ pushSubscriptions: updatedsubscriptions })
      .eq("id", user?.id);

    if (error) {
      return NextResponse.json(
        { error: "Failed to update current user's pushSubscriptions list" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "push Subscription removed" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
