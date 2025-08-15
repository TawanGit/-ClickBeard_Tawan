import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum Role {
  CLIENT = "client",
  ADMIN = "admin",
}

interface ClientState {
  id: number;
  name: string;
  email: string;
  token: string | null;
  role: Role | null;
  setUser: (
    id: number,
    name: string,
    email: string,
    token: string,
    role: Role
  ) => void;
  logout: () => void;
}

export const useClientStore = create<ClientState>()(
  persist(
    (set) => ({
      id: 0,
      name: "",
      email: "",
      token: null,
      role: null,
      setUser: (id, name, email, token, role) =>
        set(() => ({ id, name, email, token, role })),
      logout: () =>
        set(() => ({ id: 0, name: "", email: "", token: null, role: null })),
    }),
    {
      name: "client-storage",
    }
  )
);
