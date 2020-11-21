import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cxDate' })
export class MockDatePipe extends DatePipe implements PipeTransform {
  // Overload to support stricter type check from angular 11 onwards
  transform(value: null | undefined, args?: string): null;
  transform(value: any, format?: string, timezone?: string): string | null {
    return super.transform(value, format, timezone, 'en');
  }
}
