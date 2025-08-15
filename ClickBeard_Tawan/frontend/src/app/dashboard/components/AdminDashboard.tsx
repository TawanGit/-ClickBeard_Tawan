"use client";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useClientStore } from "@/store/clientStore";
import CreateSpecialty from "./modals/CreateSpecialty";
import CreateBarber from "./modals/CreateBarber";
import { statusPTBR } from "./AppointmentsClient";
import {
  handleChangeStatus,
  handleDeleteAppointment,
} from "../../../../utils/appointments";
import {
  activeModalAdmin,
  Appointment,
  Barber,
  Client,
  StatusKey,
  TodayOrFuture,
} from "../../../../types/GeneralTypes";
import { formatAppointmentDate } from "../../../../utils/dateHelpers";

const statusOptions: StatusKey[] = ["scheduled", "completed", "canceled"];

export default function AdminDashboard() {
  const { token } = useClientStore();

  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    Appointment[]
  >([]);
  const [barbersList, setBarbersList] = useState<Barber[]>([]);
  const [clientsList, setClientsList] = useState<Client[]>([]);
  const [activeModal, setActiveModal] = useState<activeModalAdmin>("");
  const [activeTab, setActiveTab] = useState<TodayOrFuture>("today");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resToday, resFuture, resBarbers, resClients] = await Promise.all(
          [
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/appointments`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }),
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/appointments/future`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }),
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/barbers`),
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/clients`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }),
          ]
        );

        const [todayData, futureData, barbersData, clientsData] =
          await Promise.all([
            resToday.json(),
            resFuture.json(),
            resBarbers.json(),
            resClients.json(),
          ]);

        setTodayAppointments(todayData);
        setUpcomingAppointments(futureData);
        setBarbersList(barbersData);
        setClientsList(clientsData);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) fetchData();
  }, [token]);

  const renderAppointments = (list: Appointment[]) =>
    list.length === 0 ? (
      <p className="text-center text-gray-500">Nenhum agendamento</p>
    ) : (
      list.map((app: Appointment) => (
        <div
          key={app.id}
          className="flex flex-col bg-white p-5 rounded-xl shadow-md transition-transform"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-green-700">
              Barbeiro: {app.barber_name}
            </h3>
            <button
              onClick={() =>
                handleDeleteAppointment(
                  app.id,
                  token!,
                  setTodayAppointments,
                  setUpcomingAppointments
                )
              }
              className="bg-red-400 p-2 rounded-lg hover:bg-red-300 transition-colors"
            >
              Deletar
            </button>
          </div>
          <p className="mt-2 text-gray-700">Cliente: {app.client_name}</p>
          <p className="mt-1 text-gray-700">
            {formatAppointmentDate(app.appointment_date)}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <p
              className={`font-semibold ${
                app.status === "scheduled"
                  ? "text-green-600"
                  : app.status === "completed"
                  ? "text-blue-600"
                  : "text-red-600"
              }`}
            >
              Status: {statusPTBR[app.status]}
            </p>
            <select
              onChange={(e) =>
                handleChangeStatus(
                  e.target.value as StatusKey,
                  app.id,
                  token!,
                  setTodayAppointments,
                  setUpcomingAppointments
                )
              }
              className="px-4 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              value={app.status}
            >
              {statusOptions
                .filter((statusOption) => statusOption)
                .map((statusOption) => (
                  <option key={statusOption} value={statusOption}>
                    {statusPTBR[statusOption]}
                  </option>
                ))}
            </select>
          </div>
        </div>
      ))
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col gap-6">
      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-green-700">Dashboard Admin</h1>
      </div>

      <div className="flex gap-2">
        <button
          className="flex items-center gap-4 rounded-full bg-white p-3 shadow-md hover:shadow-lg transition-shadow"
          onClick={() => setActiveModal("barber")}
        >
          Criar Barbeiro
          <FaPlus />
        </button>
        <button
          className="flex items-center gap-4 rounded-full bg-white p-3 shadow-md hover:shadow-lg transition-shadow"
          onClick={() => setActiveModal("specialty")}
        >
          Criar Especialidade
          <FaPlus />
        </button>
      </div>

      {activeModal === "barber" && (
        <CreateBarber onClose={() => setActiveModal("")} />
      )}
      {activeModal === "specialty" && (
        <CreateSpecialty onClose={() => setActiveModal("")} />
      )}

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[150px] bg-white p-5 rounded-xl shadow-md flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-600">Barbeiros</h2>
          <p className="text-2xl font-bold text-green-700">
            {barbersList.length}
          </p>
        </div>
        <div className="flex-1 min-w-[150px] bg-white p-5 rounded-xl shadow-md flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-600">
            Agendamentos Hoje
          </h2>
          <p className="text-2xl font-bold text-green-700">
            {todayAppointments.length}
          </p>
        </div>
        <div className="flex-1 min-w-[150px] bg-white p-5 rounded-xl shadow-md flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-600">Clientes</h2>
          <p className="text-2xl font-bold text-green-700">
            {clientsList.length}
          </p>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setActiveTab("today")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "today"
              ? "bg-green-700 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          Hoje
        </button>
        <button
          onClick={() => setActiveTab("future")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "future"
              ? "bg-green-700 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          Futuro
        </button>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {activeTab === "today"
          ? renderAppointments(todayAppointments)
          : renderAppointments(upcomingAppointments)}
      </div>
    </div>
  );
}
