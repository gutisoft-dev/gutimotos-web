export function getExpirationCountdown(expired: string): string {
  const expirationDate = new Date(expired);
  const now = new Date();

  const difference = expirationDate.getTime() - now.getTime();

  if (difference <= 0) {
    return "Expirado";
  }

  const totalMinutes = Math.floor(difference / (1000 * 60));

  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days} ${days === 1 ? "día" : "días"}`;
  }

  if (hours > 0) {
    return `${hours} ${hours === 1 ? "hora" : "horas"}`;
  }

  return `${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
}