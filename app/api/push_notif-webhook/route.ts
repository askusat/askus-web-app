import { MAILTO, PUBLIC_URL } from "@/app/config";
import { supabase } from "@/app/supabaseClient";
import { ChatMessage, User } from "@/types";
import { NextResponse } from "next/server";
import webPush, { WebPushError } from "web-push";

// token: bolingraphor

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const chat_message: ChatMessage = body.record;

    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", chat_message?.toUserId)
      .single();

    const userReceiver: User = data;

    console.log("receiver email: ");
    console.log(userReceiver?.email);

    if (error) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const subscriptions = userReceiver?.pushSubscriptions || [];

    const pushPromises = subscriptions
      .map((subscription) => {
        return webPush
          .sendNotification(
            subscription,
            JSON.stringify({
              title: `${chat_message?.userName} sent you a message`,
              body: `${chat_message?.message}`,
              icon: `${PUBLIC_URL}/favicon-32x32.png`,
              image: `${
                chat_message?.type === "image" ? chat_message?.message : ""
              }`,
              chatId: chat_message?.chatId,
            }),
            {
              vapidDetails: {
                subject: `mailto:${MAILTO}`,
                publicKey: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY || "",
                privateKey: process.env.NEXT_PUBLIC_WEB_PUSH_PRIVATE_KEY || "",
              },
            }
          )
          .catch(async (err) => {
            console.log("webPush error", err);

            if (err instanceof WebPushError && err.statusCode === 410) {
              const userSubscriptions = userReceiver?.pushSubscriptions || [];
              const updatedsubscriptions: PushSubscription[] =
                userSubscriptions.filter(
                  (subscription: PushSubscription) =>
                    subscription.endpoint !== subscription.endpoint
                );

              const { error } = await supabase
                .from("users")
                .update({ pushSubscriptions: updatedsubscriptions })
                .eq("id", userReceiver?.id);

              if (error) {
                return NextResponse.json(
                  { error: "Failed to update user" },
                  { status: 404 }
                );
              }
            }
          });
      })
      .flat();

    // console.log("pushPromises");
    // console.log(pushPromises);

    const sd = await Promise.all(pushPromises);
    console.log("sd");
    console.log(sd);

    return NextResponse.json(
      { error: "push notification sent" },
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
