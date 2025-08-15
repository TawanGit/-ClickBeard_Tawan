"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/clients`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Ocorreu um erro ao cadastrar");
        setLoading(false);
        return;
      }

      setSuccess("Cadastrado com sucesso! Redirecionando...");
      setLoading(false);

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (e: any) {
      setError("Ocorreu um erro ao tentar cadastrar");
      console.error("Sign up error:", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
          Inscreva-se Agora
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              required
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition-colors ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm mb-4 text-center">{success}</p>
          )}
        </form>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Já tem uma conta?{" "}
          <Link href="/" className="text-green-600 font-semibold">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
