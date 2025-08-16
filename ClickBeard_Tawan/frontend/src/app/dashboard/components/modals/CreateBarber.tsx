"use client";
import { useState } from "react";
import SelectSpecialties from "../SelectSpecialty";
import Day from "../Day";
import { MessageSuccessOrError } from "../../../../../types/GeneralTypes";
import { handleCreateNewBarber } from "../../../../../utils/barbers";
import { useClientStore } from "../../../../store/clientStore";
import Message from "../Message";

interface Props {
  onClose: () => void;
}

export default function CreateBarber({ onClose }: Props) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [accountingDate, setAccountingDate] = useState("");
  const [speciality, setSpeciality] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageSuccessOrError | null>(null);
  const { token } = useClientStore();
  async function handleCreateBarber() {
    try {
      setLoading(true);
      setMessage(null);

      await handleCreateNewBarber({
        name,
        cpf,
        age: Number(age),
        accountingDate,
        speciality,
        token,
      });

      setMessage({
        text: "Barbeiro criado com sucesso!",
        type: "success",
      });

      setName("");
      setCpf("");
      setAge("");
      setAccountingDate("");
      setSpeciality(null);
    } catch (error: any) {
      setMessage({
        text: error.message || "Algo deu errado",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-green-700">
            Criar Barbeiro
          </h2>
          <button
            onClick={onClose}
            className="text-red-600 font-bold hover:text-red-400 transition-colors"
          >
            X
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome do barbeiro"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="number"
            placeholder="Idade"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <Day
            text="Data de Contratação"
            day={(day) => setAccountingDate(day)}
          />

          <SelectSpecialties speciality={(id) => setSpeciality(id)} />

          <button
            onClick={handleCreateBarber}
            disabled={loading}
            className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-400 transition-colors disabled:opacity-50"
          >
            {loading ? "Criando..." : "Criar"}
          </button>

          <Message message={message} />
        </div>
      </div>
    </div>
  );
}
