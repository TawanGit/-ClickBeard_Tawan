"use client";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import SelectSpecialties from "./SelectSpecialty";
import SelectBarber from "./SelectBarber";
import SelectAppointment from "./SelectAppointment";
import { IoMdClose } from "react-icons/io";
import Day from "./Day";
import { fromZonedTime } from "date-fns-tz";
import { useClientStore } from "@/store/clientStore";

interface Props {
  clientId: number;
  onClose: () => void;
  onNewAppointment: () => void;
}

export default function CreateAppointment({
  clientId,
  onClose,
  onNewAppointment,
}: Props) {
  const [speciality, setSpecialties] = useState<number>();
  const [barber, setBarber] = useState<number>(0);
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSelectedSlot] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { token } = useClientStore();
  async function handleAppointment() {
    if (!day || !slot || !barber || !speciality) {
      setMessage("Selecione todos os campos antes de agendar.");
      return;
    }

    const localDateTime = `${day} ${slot}`;
    const appointment_date = fromZonedTime(
      localDateTime,
      "America/Sao_Paulo"
    ).toISOString();

    try {
      setLoading(true);
      setMessage(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            client_id: clientId,
            barber_id: barber,
            appointment_date,
            status: "scheduled",
          }),
        }
      );

      if (res.ok) {
        setLoading(false);
        setMessage("Agendamento criado com sucesso!");
        onNewAppointment();
        onClose();
      } else {
        const errorData = await res.json();
        setLoading(false);
        throw new Error(errorData.message || "Erro ao criar agendamento");
      }
    } catch (error: any) {
      console.error(error);
      setMessage(`Erro: ${error.message || "Algo deu errado"}`);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-green-700">
            Novo Agendamento
          </h2>
          <IoMdClose
            className="hover:brightness-200 cursor-pointer text-red-700"
            onClick={onClose}
          />
        </div>
        <div className="p-4 flex flex-col gap-4">
          <SelectSpecialties speciality={(id) => setSpecialties(id)} />

          {speciality && (
            <SelectBarber
              specialty={speciality}
              barber={(id) => setBarber(id)}
            />
          )}

          {speciality && barber !== 0 && (
            <Day text="Escolha a data" day={(day) => setDay(day)} />
          )}

          {speciality && barber !== 0 && day && (
            <SelectAppointment
              barberId={barber}
              day={day}
              onSelectSlot={(slot) => setSelectedSlot(slot)}
            />
          )}

          {barber !== 0 && slot && speciality && (
            <button
              onClick={handleAppointment}
              disabled={loading}
              className="bg-green-500 w-full p-2 rounded-lg mt-2 hover:bg-green-400 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Agendando..." : "Agendar"}
            </button>
          )}

          {message && (
            <p
              className={`text-sm ${
                message.includes("Erro") ? "text-red-500" : "text-green-600"
              } mt-2`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
