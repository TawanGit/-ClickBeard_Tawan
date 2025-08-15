"use client";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateAppointment from "./CreateAppointment";
import { useRouter } from "next/navigation";
import { handleChangeStatus } from "../../../../utils/appointments";
import {
  formatAppointmentDate,
  isMoreThanTwoHoursAway,
} from "../../../../utils/dateHelpers";

export const statusPTBR = {
  scheduled: "Agendado",
  completed: "Concluído",
  canceled: "Cancelado",
};

interface appointment {
  id: number;
  barber_name: string;
  status: "scheduled" | "completed" | "canceled";
  appointment_date: string;
}
export default function AppointmentsClient() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [clientId, setClientId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [newAppointment, setNewAppointment] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    if (id) setClientId(Number(id));
    if (token) setToken(token);
  }, []);

  useEffect(() => {
    if (!clientId) return;

    const fetchAppointments = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/appointments/${clientId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setNewAppointment(false);
      }
    };

    fetchAppointments();
  }, [clientId, newAppointment]);

  if (!clientId) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="font-bold text-green-700 text-3xl">Meus Agendamentos</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="rounded-full bg-white p-3 text-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <FaPlus />
        </button>
      </div>

      {modalOpen && (
        <CreateAppointment
          clientId={clientId}
          onClose={() => setModalOpen(false)}
          onNewAppointment={() => setNewAppointment(true)}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {appointments.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            Nenhum agendamento encontrado
          </p>
        )}

        {appointments.map((app: appointment) => (
          <div
            key={app.id}
            className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-green-700">
              Barbeiro: {app.barber_name}
            </h2>
            <p className="text-gray-700 mt-2">
              {formatAppointmentDate(app.appointment_date)}
            </p>
            <p
              className={`mt-3 font-semibold ${
                app.status === "scheduled"
                  ? "text-green-600"
                  : app.status === "completed"
                  ? "text-blue-600"
                  : "text-red-600"
              }`}
            >
              Status: {statusPTBR[app.status]}
            </p>

            {app.status !== "canceled" &&
              isMoreThanTwoHoursAway(app.appointment_date) && (
                <button
                  onClick={() =>
                    handleChangeStatus(
                      "canceled",
                      app.id,
                      token!,
                      setAppointments
                    )
                  }
                  className="bg-red-400 rounded-lg p-2 mt-3 cursor-pointer hover:bg-red-300 transition-colors"
                >
                  Cancelar Agendamento
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
