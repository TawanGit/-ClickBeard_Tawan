"use client";
import { useState } from "react";
import { createSpecialty } from "../../../../../utils/specialties";
import { useClientStore } from "../../../../store/clientStore";

interface Props {
  onClose: () => void;
}

export default function CreateSpecialty({ onClose }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { token } = useClientStore();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-green-700">
            Criar Especialidade
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
            placeholder="Nome da especialidade"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={() =>
              createSpecialty(name, token!, setMessage, setLoading)
            }
            disabled={loading}
            className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-400 transition-colors disabled:opacity-50"
          >
            {loading ? "Criando..." : "Criar"}
          </button>
          {message && (
            <p
              className={`text-center font-semibold ${
                message.includes("Erro") ? "text-red-500" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
