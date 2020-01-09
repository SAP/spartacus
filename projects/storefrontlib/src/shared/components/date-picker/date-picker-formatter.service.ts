import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatePickerFormatterService {
  constructor() {}

  toNative(value: string): string {
    return value ? new Date(value).toISOString().split('T')[0] : null;
  }

  toModel(value: string, endOfDay: boolean): string {
    if (value) {
      let date = new Date(value)
        .toISOString()
        .replace('.', '+')
        .replace('Z', '0');
      if (endOfDay) {
        // TODO Here should be 23:59:59, but from backend I'm getting (CEST) '00:59:59', IMO backend should use UTC-0
        date = date.replace('00:00:00', '00:59:59');
      }
      return date;
    }
  }
}
