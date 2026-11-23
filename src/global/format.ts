const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function formatCurrency(value: number): string {
  return currency.format(value);
}

// Accepts "10,50", "10.50" or "1.234,56"
export function parsePrice(text: string): number {
  const normalized = text.includes(',') ? text.replace(/\./g, '').replace(',', '.') : text;
  return Number(normalized);
}

// SQLite stores "YYYY-MM-DD HH:MM:SS"
export function formatDateTime(value: string): string {
  const [date, time = ''] = value.split(' ');
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year} ${time.slice(0, 5)}`;
}
