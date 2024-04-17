export const formatDateTime = (date: Date | string) => {
  return new Date(date).toLocaleString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatCurrency = (valueCents: number | string) => {
  if (typeof valueCents === 'string') {
    valueCents = parseInt(valueCents, 10);
  }
  const value = valueCents / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
