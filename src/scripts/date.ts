const getNameOfMonth = (month: number): string => {
  const months = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
  return months[month] || "";
};

export function formatDate(date: Date): string {
  const parsedDate = new Date(date);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - parsedDate.getTime();
  const minuteDifference = Math.floor(timeDifference / (1000 * 60));

  // Más de 1 día
  if (minuteDifference >= 1440) {
    const day = parsedDate.getDate();
    const month = getNameOfMonth(parsedDate.getMonth());
    return `${day} ${month}`;
  }

  // Más de 1 hora pero menos de 1 día
  if (minuteDifference >= 60) {
    const hoursDifference = Math.floor(minuteDifference / 60);
    return `${hoursDifference}h`;
  }

  // Menos de 1 hora
  return `${minuteDifference}min`;
}
