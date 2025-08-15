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
