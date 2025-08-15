"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Role, useClientStore } from "@/store/clientStore";
import Link from "next/link";

export default function BarberLogin() {
  const router = useRouter();
  const { token, setUser } = useClientStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role") as Role;

    if (storedId && storedToken && storedName && storedEmail && storedRole) {
      setUser(
        Number(storedId),
        storedName,
        storedEmail,
        storedToken,
        storedRole
      );
      router.push("/dashboard");
    }

    setHydrated(true);
  }, [router, setUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erro ao logar");
        setLoading(false);
        return;
      }

      setUser(
        data.client.id,
        data.client.name,
        data.client.email,
        data.access_token,
        data.client.role
      );
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("id", data.client.id);
      localStorage.setItem("name", data.client.name);
      localStorage.setItem("email", data.client.email);
      localStorage.setItem("role", data.client.role);

      router.push("/dashboard");
    } catch (err: any) {
      setError("Ocorreu um erro ao tentar logar");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!hydrated) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
          Click Beard
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-500 text-sm">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-green-600 font-semibold">
            Se registrar
          </Link>
        </p>
      </div>
    </div>
  );
}
