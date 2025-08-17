"use client";

import { useClientStore } from "@/store/clientStore";
import { useRouter } from "next/navigation";
import { IoIosLogOut, IoIosNotifications } from "react-icons/io";

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
          {role === "admin" && (
            <button className="relative p-2 rounded-full hover:bg-gray-100  transition-colors">
              <IoIosNotifications className="text-gray-600 text-2xl" />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
              {/* ainda não implementado */}
            </button>
          )}

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
