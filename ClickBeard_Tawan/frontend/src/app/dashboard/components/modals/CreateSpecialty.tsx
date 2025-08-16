"use client";
import { useEffect, useState } from "react";
import {
  createSpecialty,
  getSpecialties,
} from "../../../../../utils/specialties";
import { useClientStore } from "../../../../store/clientStore";
import {
  MessageSuccessOrError,
  Specialties,
} from "../../../../../types/GeneralTypes";
import Message from "../Message";

interface Props {
  onClose: () => void;
}

export default function CreateSpecialty({ onClose }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageSuccessOrError | null>(null);
  const [specialties, setSpecialties] = useState<Specialties[]>([]);
  const { token } = useClientStore();

  useEffect(() => {
    getSpecialties(token!, setSpecialties);
  });
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        {specialties && (
          <>
            <p className="my-2 text-xl font-semibold text-gray-700">
              Especialidades já criadas:
            </p>
            <div className="flex flex-wrap gap-2 items-center max-h-24 overflow-y-auto p-2 border border-gray-200 rounded-lg cursor-default bg-gray-50">
              {specialties.map((specialty) => (
                <span
                  key={specialty.id}
                  className="px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full shadow-sm hover:bg-green-200 transition"
                >
                  {specialty.name}
                </span>
              ))}
            </div>
          </>
        )}

        <div className="flex justify-between items-center mb-4 mt-4">
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

          <Message message={message} />
        </div>
      </div>
    </div>
  );
}
