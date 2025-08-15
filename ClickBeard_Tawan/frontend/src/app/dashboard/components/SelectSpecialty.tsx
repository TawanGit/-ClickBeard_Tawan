"use client";
import React, { useEffect, useState } from "react";
import { Specialties } from "../../../../types/GeneralTypes";

interface Props {
  speciality: (id: number) => void;
}

export default function SelectSpecialties({ speciality }: Props) {
  const [specialties, setSpecialties] = useState<Specialties[]>([]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/specialties`
        );
        const data = await res.json();
        setSpecialties(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSpecialties();
  }, []);

  return (
    <select
      defaultValue={""}
      onChange={(e) => speciality(Number(e.target.value))}
      className="border rounded-md p-2 w-full mb-4"
    >
      <option value="" disabled>
        Selecione a especialidade
      </option>
      {specialties.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
