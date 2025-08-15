import React, { SetStateAction } from "react";
import { FaPlus, FaUserEdit } from "react-icons/fa";
import { activeModalAdmin } from "../../../../types/GeneralTypes";
import { PiOfficeChairFill } from "react-icons/pi";

interface Props {
  setActiveModal: (active: SetStateAction<activeModalAdmin>) => void;
}
function TripleButton({ setActiveModal }: Props) {
  return (
    <div className="flex  rounded-full border border-gray-300 overflow-hidden w-max shadow-sm text-sm">
      <button
        onClick={() => setActiveModal("barber")}
        className="flex items-center justify-center gap-1 px-4 py-2 border-b sm:border-b-0 sm:border-r border-gray-300 transition-colors hover:bg-gray-100"
      >
        <PiOfficeChairFill className="text-gray-600" />
        <span className="hidden sm:inline">Criar Barbeiro</span>
      </button>

      <button
        onClick={() => setActiveModal("specialty")}
        className="flex items-center justify-center gap-1 px-4 py-2 border-b sm:border-b-0 sm:border-r border-gray-300 transition-colors hover:bg-gray-100"
      >
        <FaPlus className="text-gray-600" />
        <span className="hidden sm:inline">Criar Especialidade</span>
      </button>

      <button
        onClick={() => setActiveModal("addSpecialtyToBarber")}
        className="flex items-center justify-center gap-1 px-4 py-2 transition-colors hover:bg-gray-100"
      >
        <FaUserEdit className="text-gray-600" />
        <span className="hidden sm:inline">Adicionar ao Barbeiro</span>
      </button>
    </div>
  );
}

export default TripleButton;
