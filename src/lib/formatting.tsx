export function formatDate(isoDate: string): string {
  try {
    const date = new Date(isoDate)
    return new Intl.DateTimeFormat('es-BO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  } catch {
    return isoDate
  }
}

export function formatCurrency(
  amount: number,
  locale: string = 'es-BO',
  currency: string = 'BOB'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `${amount.toFixed(2)} ${currency}`
  }
}
export function getTimeUntilExpiry(expiredDate: string): {
  minutes: number
  seconds: number
  isExpired: boolean
} {
  const now = new Date()
  const expiry = new Date(expiredDate)
  const diff = expiry.getTime() - now.getTime()

  if (diff <= 0) {
    return { minutes: 0, seconds: 0, isExpired: true }
  }

  const minutes = Math.floor(diff / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)

  return { minutes, seconds, isExpired: false }
}