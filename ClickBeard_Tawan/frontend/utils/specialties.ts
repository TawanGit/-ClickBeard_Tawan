export const createSpecialty = async (
  name: string,
  token: string,
  setMessage: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!name.trim()) {
    setMessage("Informe o nome da especialidade.");
    return;
  }
  try {
    setLoading(true);
    setMessage(null);
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/specialties`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
    if (!result.ok) {
      const errorData = await result.json();
      throw new Error(errorData.message || "Erro ao criar especialidade");
    }
    setMessage(`Especialidade Criada com sucesso!`);
  } catch (error: any) {
    setMessage(`Erro: ${error.message || "Algo deu errado"}`);
  } finally {
    setLoading(false);
  }
};
