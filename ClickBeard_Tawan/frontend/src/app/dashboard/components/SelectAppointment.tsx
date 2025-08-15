"use client";
import { useClientStore } from "@/store/clientStore";
import React, { useEffect, useState } from "react";

interface Props {
  barberId: number;
  day: string;
  onSelectSlot: (slot: string) => void;
}

function SelectAppointment({ barberId, day, onSelectSlot }: Props) {
  const [appointments, setAppointments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useClientStore();
  useEffect(() => {
    const fetchAppointmentsForThisBarber = async () => {
      try {
        setLoading(true);
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/appointments/available?date=${day}&barber_id=${barberId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data: string[] = await result.json();

        const now = new Date();
        const futureSlots = data.filter((slot) => {
          const [hour, minute] = slot.split(":").map(Number);
          const slotDate = new Date(`${day}T${slot.padStart(5, "0")}:00`);
          return slotDate >= now;
        });

        setAppointments(futureSlots);
      } catch (e) {
        console.error("Error fetching appointments:", e);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    if (barberId && day) {
      fetchAppointmentsForThisBarber();
    }
  }, [barberId, day]);

  if (loading) {
    return <p className="text-gray-500">Carregando horários disponíveis...</p>;
  }

  if (appointments.length === 0) {
    return (
      <p className="text-red-500">Não há horários disponíveis neste dia.</p>
    );
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-4 max-h-60 overflow-auto p-2">
      {appointments.map((slot) => (
        <button
          key={slot}
          onClick={() => onSelectSlot(slot)}
          className="p-3 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 hover:scale-105 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          {slot}
        </button>
      ))}
    </div>
  );
}

export default SelectAppointment;
