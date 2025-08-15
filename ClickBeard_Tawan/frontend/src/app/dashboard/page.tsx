"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import AppointmentsClient from "./components/AppointmentsClient";
import { useClientStore } from "@/store/clientStore";
import AdminDashboard from "./components/AdminDashboard";

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { role } = useClientStore();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <p>Verificando autenticação...</p>;
  }

  return (
    <div>
      <Header />
      {role && role === "client" ? <AppointmentsClient /> : <AdminDashboard />}
    </div>
  );
}
