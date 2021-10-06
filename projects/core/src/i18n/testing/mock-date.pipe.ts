import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cxDate' })
export class MockDatePipe extends DatePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any;
  // Overload to support stricter type check from angular 11 onwards
  transform(
    value: Date | string | number | null | undefined,
    format?: string,
    timezone?: string,
    locale = 'en'
  ): string | null {
    return super.transform(value, format, timezone, locale);
  }
}
