"use client";

import { useClientStore } from "@/store/clientStore";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import Notifications from "./Notifications";

export default function Header() {
  const { logout } = useClientStore();
  const router = useRouter();
  const { role } = useClientStore();
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
        <div className="flex items-center gap-4">
          {role === "admin" && <Notifications />}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2   rounded-full px-4 py-2 text-gray-700 font-medium hover:text-gray-900 transition-all shadow-sm"
          >
            <IoIosLogOut className="text-lg" />
            <span className="">Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
}
