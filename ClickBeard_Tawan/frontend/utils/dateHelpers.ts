export const isMoreThanTwoHoursAway = (dateString: string) => {
  return (
    (new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60 * 60) >
    2
  );
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
