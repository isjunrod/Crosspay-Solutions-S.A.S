export const formatCurrency = (amount: number, currency: string = 'COP') => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatCardNumber = (cardNumber: string) => {
  return cardNumber.replace(/(\d{4})/g, '$1 ').trim();
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'text-amber-400 bg-amber-400/10';
    case 'completed':
      return 'text-emerald-400 bg-emerald-400/10';
    case 'failed':
      return 'text-red-400 bg-red-400/10';
    default:
      return 'text-slate-400 bg-slate-400/10';
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Pendiente';
    case 'completed':
      return 'Completado';
    case 'failed':
      return 'Fallido';
    default:
      return status;
  }
};
