import { StatusKey } from "../types/StatusKey";

export const handleChangeStatus = async (
  status: StatusKey,
  id: number,
  token: string,
  setTodayAppointments: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/appointments`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, id }),
    });

    setTodayAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  } catch (err) {
    console.error(err);
  }
};
