const getNameOfMonth = (month: number) => {
  const fixedMonth = month + 1;

  if (fixedMonth === 1) return "ene";
  if (fixedMonth === 2) return "feb";
  if (fixedMonth === 3) return "mar";
  if (fixedMonth === 4) return "abr";
  if (fixedMonth === 5) return "may";
  if (fixedMonth === 6) return "jun";
  if (fixedMonth === 7) return "jul";
  if (fixedMonth === 8) return "ago";
  if (fixedMonth === 9) return "sep";
  if (fixedMonth === 10) return "oct";
  if (fixedMonth === 11) return "nov";
  return "dic";
};

export function formatDate(date: string): string {
  const parsedDate = new Date(date);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - parsedDate.getTime();
  const minuteDifference = Math.floor(timeDifference / (1000 * 60));

  if (minuteDifference >= 60) {
    const hoursDifference = Math.floor(minuteDifference / 60);
    return `${hoursDifference}h`;
  }

  if (minuteDifference >= 1440) {
    const day = parsedDate.getDate();
    const month = getNameOfMonth(parsedDate.getMonth());

    return day + month;
  }
  return `${Math.abs(minuteDifference)}min`;
}
