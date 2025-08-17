import { NotificationsApi } from "../types/GeneralTypes";

export async function getNotificationsNotRead(
  token: string,
  setNotifications: React.Dispatch<React.SetStateAction<NotificationsApi[]>>
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notifications`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  setNotifications(data);
}
