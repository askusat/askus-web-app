import { PUBLIC_URL } from "@/app/config";
import { supabase } from "@/app/supabaseClient";
import { ChatMessage, User } from "@/types";
import { NextResponse } from "next/server";
import webPush from 'web-push'

// token: bolingraphor

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const chat_message: ChatMessage = body.record;

    const {data, error} = await supabase.from('users').select().eq('id', chat_message?.toUserId).single()
    const userReceiver: User = data
    const subscriptions = userReceiver?.pushSubscriptions || [];
    subscriptions.map(subscription => {
      webPush.sendNotification(
        subscription,
        JSON.stringify({
          title: `${chat_message?.userName} sent you a message`,
          body: `${chat_message?.message}`,
          icon: `${PUBLIC_URL}/favicon-32x32.png`
        })
      )
    })

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
