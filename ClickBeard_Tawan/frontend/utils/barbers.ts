import { CreateBarber } from "../types/GeneralTypes";

export const getBarbersWithoutSpecialty = async (
  specialty: number,
  token: string
) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/barbers/withoutSpecialty/${specialty}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const barbers = await result.json();
  return barbers;
};

export const handleAddSpecialtyToBarber = async (
  specialtyId: number,
  barberId: number,
  token: string
) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/barbers/createSpecialtyToBarber`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ specialtyId, barberId }),
    }
  );

  const barbers = await result.json();
  return barbers;
};

export async function handleCreateNewBarber(createBarber: CreateBarber) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/barbers/register`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${createBarber.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: createBarber.name,
        cpf: createBarber.cpf,
        age: createBarber.age,
        accounting_date: createBarber.accountingDate
          .split("/")
          .reverse()
          .join("/"),
        specialtyId: createBarber.speciality,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    const firstError = Array.isArray(data.message)
      ? data.message[0]
      : data.message;
    throw new Error(firstError || "Erro ao criar barbeiro");
  }

  return data;
}
