import { Notification, User } from "@/types";
import { supabase } from "../supabaseClient";

export function formatDate(inputDate: Date): string {
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const date = new Date(inputDate);
  const formattedDate = date.toLocaleDateString("en-US", options);
  // const formattedTime = date.toLocaleTimeString('en-US', options);

  // return `${formattedDate} - ${formattedTime}`;
  return `${formattedDate}`;
}

export function formatDateToDMYY(timestamp: Date): string {
  const date = new Date(timestamp);
  const year = date.getFullYear().toString().slice(-2); // Extract last 2 digits of the year
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}-${month}-${year}`;
}

export const markAllNotificationAsRead = async (
  user: User,
  setNotifications: (newNotifications: Notification[]) => void
) => {
  await supabase
    .from("notifications")
    .update({ read: true })
    .eq("userId", user?.id);

  setNotifications([]);
};

export const markNotificationAsRead = async (
  user: User,
  notification_id: number,
  notifications: Notification[],
  setNotifications: (newNotifications: Notification[]) => void
) => {
  await supabase
    .from("notifications")
    .update({ read: true })
    .eq("userId", user?.id)
    .eq("id", notification_id);

  setNotifications(
    notifications.filter((notification) => notification?.id !== notification_id)
  );
};

export function getFirstName(fullName: string) {
  const firstName = fullName.split(' ')[0];
  return firstName;
}
