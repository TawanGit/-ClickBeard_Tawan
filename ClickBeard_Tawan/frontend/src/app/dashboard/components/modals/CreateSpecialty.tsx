"use client";
import { useState } from "react";

interface Props {
  onClose: () => void;
}

export default function CreateSpecialty({ onClose }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!name.trim()) {
      setMessage("Informe o nome da especialidade.");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/specialties`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erro ao criar especialidade");
      }

      setMessage("Especialidade criada com sucesso!");
      setName("");
    } catch (error: any) {
      setMessage(`Erro: ${error.message || "Algo deu errado"}`);
    } finally {
      setLoading(false);
    }
  };

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
            onClick={handleCreate}
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
