
export function addMinutes(dateInput: string | Date, minutes: number): string;
export function addMinutes(dateInput: string | Date, minutes: number, asStr: false): Date;
export function addMinutes(dateInput: string | Date, minutes: number, asStr: boolean = true): string | Date {
  const date = typeof dateInput === 'string'
    ? new Date(dateInput)
    : dateInput;

  date.setTime(date.getTime() + minutes * 60 * 1_000);

  return asStr ? date.toISOString() : date;
}
