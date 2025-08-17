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

export const formatAppointmentDate = (
  dateString: string | Date,
  lessThree?: boolean
) => {
  let date = new Date(dateString);

  if (lessThree) {
    date = new Date(date.getTime() - 3 * 60 * 60 * 1000);
  }

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Sao_Paulo",
  });
};

export function formatNotificationMessage(message: string) {
  const regex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;
  const match = message.match(regex);

  if (match) {
    const isoDate = match[0];
    const dateObj = new Date(isoDate);

    const formatted = dateObj.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return message.replace(isoDate, formatted);
  }

  return message;
}
