"use client";

import { useClientStore } from "@/store/clientStore";
import { useRouter } from "next/navigation";

export default function Header() {
  const { logout } = useClientStore();
  const router = useRouter();
  function handleLogout() {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    router.push("/");
  }
  return (
    <div className="p-4 text-green shadow-md">
      <div className="flex justify-between items-center">
        <p className="text-green-700 text-2xl">
          Click<span className="text-black">Beard</span>
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-400 rounded-full p-1 px-4 text-white hover:brightness-95  cursor-pointer"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
