import { StatusKey } from "../types/GeneralTypes";

export const handleChangeStatus = async (
  status: StatusKey,
  id: number,
  token: string,
  setTodayAppointments: React.Dispatch<React.SetStateAction<any[]>>,
  setUpcomingAppointments?: React.Dispatch<React.SetStateAction<any[]>>
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
    if (setUpcomingAppointments) {
      setUpcomingAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    }
  } catch (err) {
    console.error(err);
  }
};

export const handleDeleteAppointment = async (
  id: number,
  token: string,
  setTodayAppointments: React.Dispatch<React.SetStateAction<any[]>>,
  setUpcomingAppointments: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/appointments/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      setTodayAppointments((prev) => prev.filter((a) => a.id !== id));
      setUpcomingAppointments((prev) => prev.filter((a) => a.id !== id));
    }
  } catch (err) {
    console.error(err);
  }
};
