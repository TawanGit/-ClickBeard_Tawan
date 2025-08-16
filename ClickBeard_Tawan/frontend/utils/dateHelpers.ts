export const isMoreThanTwoHoursAway = (dateString: string) => {
  return (
    (new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60 * 60) >
    2
  );
};

export const isMoreThanFiveDaysOld = (dateString: string): boolean => {
  const givenDate = new Date(dateString).getTime();
  const now = new Date().getTime();

  const differenceInDays = (now - givenDate) / (1000 * 60 * 60 * 24);

  return differenceInDays > 5;
};

export const formatAppointmentDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Sao_Paulo",
  });
};
