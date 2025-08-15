import React, { useState } from "react";
import SelectSpecialties from "../SelectSpecialty";
import { Barber } from "../../../../../types/GeneralTypes";
import {
  getBarbersWithoutSpecialty,
  handleAddSpecialtyToBarber,
} from "../../../../../utils/barbers";
import { useClientStore } from "../../../../store/clientStore";

interface Props {
  onClose: () => void;
}

function AddSpecialtyToBarber({ onClose }: Props) {
  const [specialty, setSpecialty] = useState<number>();
  const [barbers, setBarbers] = useState<Barber[]>();
  const [selectedBarber, setSelectedBarber] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const { token } = useClientStore();

  async function handleSetSpecialty(id: number) {
    setSpecialty(id);
    setSelectedBarber(undefined);
    setMessage(null);
    const barbersList = await getBarbersWithoutSpecialty(id, token!);
    setBarbers(barbersList);
  }

  const handleSubmit = async () => {
    if (!specialty || !selectedBarber) {
      setMessage({
        text: "Por favor, selecione especialidade e barbeiro.",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);
      await handleAddSpecialtyToBarber(specialty, selectedBarber, token!);
      setMessage({
        text: "Especialidade atribuída com sucesso!",
        type: "success",
      });

      setSpecialty(undefined);
      setSelectedBarber(undefined);
      setBarbers([]);
    } catch (err) {
      console.error(err);
      setMessage({ text: "Erro ao atribuir especialidade.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-green-700">
            Adicionar Especialidade
          </h2>
          <button
            onClick={onClose}
            className="text-red-600 font-bold hover:text-red-400 transition-colors"
          >
            X
          </button>
        </div>

        <SelectSpecialties speciality={(id) => handleSetSpecialty(id)} />

        {barbers && barbers.length > 0 && (
          <select
            value={selectedBarber || ""}
            onChange={(e) => setSelectedBarber(Number(e.target.value))}
            className="w-full mb-4 p-2 border rounded"
          >
            <option value="">Selecionar</option>
            {barbers.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        )}

        {message && (
          <div
            className={`mb-4 p-2 rounded text-center ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          className={`mt-4 w-full py-2 px-4 rounded-lg font-semibold shadow-md transition-all duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg"
          }`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Atribuindo..." : "Atribuir"}
        </button>
      </div>
    </div>
  );
}

export default AddSpecialtyToBarber;
