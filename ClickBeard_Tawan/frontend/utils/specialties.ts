import { MessageSuccessOrError, Specialties } from "../types/GeneralTypes";

export const createSpecialty = async (
  name: string,
  token: string,
  setMessage: React.Dispatch<
    React.SetStateAction<MessageSuccessOrError | null>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!name.trim()) {
    setMessage({ text: "Informe o nome da especialidade.", type: "error" });
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
    setMessage({ text: `Especialidade Criada com sucesso!`, type: "success" });
  } catch (error: any) {
    setMessage({
      text: `${error.message || "Algo deu errado"}`,
      type: "error",
    });
  } finally {
    setLoading(false);
  }
};

export const getSpecialties = async (
  token: string,
  setSpecialties: React.Dispatch<React.SetStateAction<Specialties[]>>
) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/specialties`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await result.json();
    setSpecialties(data);
  } catch (e) {
    console.log(e);
  }
};
