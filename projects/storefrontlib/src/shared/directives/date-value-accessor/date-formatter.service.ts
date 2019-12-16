import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateFormatterService {
  constructor() {}

  toDate(value): Date {
    return new Date(value);
  }

  transform(value: string, eod: boolean): string {
    let date = new Date(value)
      .toISOString()
      .replace('.', '+')
      .replace('Z', '0');
    if(eod) {
      date = date.replace('00:00:00','00:59:59')
    }
    return date;
  }
}
