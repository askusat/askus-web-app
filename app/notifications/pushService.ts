import { User } from "@/types";
import { getReadyServiceWorker } from "../utils/serviceWorker";

export async function getCurrentPushSubscription(): Promise<PushSubscription | null> {
  const sw = await getReadyServiceWorker();
  return sw.pushManager.getSubscription();
}

export async function registerPushSubscription(user: User) {
  if (!("PushManager" in window)) {
    throw new Error("Push notification is not available in this browser");
  }
  const existingSubscription = await getCurrentPushSubscription();
  if (existingSubscription) {
    throw new Error("Push notification already exists");
  }
  const sw = await getReadyServiceWorker();
  const subscription = await sw.pushManager.subscribe({
    userVisibleOnly: true, // can't be false
    applicationServerKey: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  });
  await sendPushSubscriptionToServer(subscription, user);
}

export async function unregisterPushNotifications(user: User) {
  const existingSubscription = await getCurrentPushSubscription();
  if (!existingSubscription) {
    throw Error("No existing push subscription found");
  }
  await deletePushSubscriptionFromServer(existingSubscription, user);
  await existingSubscription.unsubscribe();
}

export async function sendPushSubscriptionToServer(
  subscription: PushSubscription,
  user: User
) {
  // console.log("Sending push subscription to server", subscription, user);
  const response = await fetch("/api/register-push", {
    method: "POST",
    body: JSON.stringify({ subscription, user})
  })
  if (!response.ok){
    throw Error("Failed to send push subscription to server")
  }
}

export async function deletePushSubscriptionFromServer(
  subscription: PushSubscription,
  user: User
) {
  // console.log("Deleting push subscription from server", subscription, user);
  const response = await fetch("/api/register-push", {
    method: "DELETE",
    body: JSON.stringify({ subscription, user})
  })
  if (!response.ok){
    throw Error("Failed to delete push subscription from server")
  }
}
