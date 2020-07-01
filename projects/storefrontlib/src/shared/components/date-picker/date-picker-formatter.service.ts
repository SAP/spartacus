import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatePickerFormatterService {
  constructor() {}

  toNative(value: string): string {
    console.log(value ? new Date(value).toISOString().split('.')[0] : null);
    return value
      ? new Date(value)
          .toISOString()
          .replace('.', '+')
          .replace('Z', '0')
          .replace('+0000', this.getLocalTimezoneOffset())
      : null;
  }

  toModel(value: string, endOfDay: boolean): string {
    if (value) {
      let date: any = new Date(value);
      console.log(date.toISOString());
      date = date
        .toISOString()
        .replace('.', '+')
        .replace('Z', '0')
        .replace('+0000', this.getLocalTimezoneOffset());

      console.log(
        value,
        date,
        new Date(value).toISOString(),
        new Date().getTimezoneOffset()
      );
      if (endOfDay) {
        date = date.replace('00:00:00', '23:59:59');
      }
      return date;
    }
  }

  getLocalTimezoneOffset(invert?: boolean): string {
    const offset = new Date().getTimezoneOffset() * -1;
    const hours = this.padWithZeroes(
      Math.abs(Math.floor(offset / 60)).toString(),
      2
    );
    const minutes = this.padWithZeroes((offset % 60).toString(), 2);
    return offset >= 0
      ? !invert
        ? `+${hours}:${minutes}`
        : `-${hours}:${minutes}`
      : !invert
      ? `-${hours}:${minutes}`
      : `+${hours}:${minutes}`;
  }

  protected padWithZeroes(str: string, max: number) {
    str = str.toString();
    return str.length < max ? this.padWithZeroes('0' + str, max) : str;
  }
}
