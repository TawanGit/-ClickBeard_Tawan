import React, { useEffect, useState } from "react";

interface Barber {
  id: number;
  name: string;
}

interface Props {
  specialty: number;
  barber: (id: number) => void;
}

function SelectBarber({ specialty, barber }: Props) {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchBarbersWithSpecialty = async () => {
      setLoading(true);
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/barbers/specialties/${specialty}`
        );
        const data = await result.json();
        setBarbers(data);
      } catch (err) {
        console.error(err);
        setBarbers([]);
      } finally {
        setLoading(false);
      }
    };

    if (specialty) {
      fetchBarbersWithSpecialty();
    }
  }, [specialty]);

  return (
    <div>
      <p className="text-gray-700 font-medium mb-2">Escolha um barbeiro:</p>

      {loading ? (
        <p className="text-gray-500">Carregando barbeiros...</p>
      ) : barbers.length === 0 ? (
        <p className="text-red-500">
          Nenhum barbeiro disponível para esta especialidade.
        </p>
      ) : (
        <select
          className="w-full border rounded-md p-2 bg-green-50 text-gray-700 hover:bg-green-100 transition"
          onChange={(e) => barber(Number(e.target.value))}
        >
          <option value="">Selecione</option>
          {barbers.map((barber) => (
            <option key={barber.id} value={barber.id}>
              {barber.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default SelectBarber;
