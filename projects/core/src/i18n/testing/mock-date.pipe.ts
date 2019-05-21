import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'cxDate' })
export class MockDatePipe extends DatePipe implements PipeTransform {
  transform(value: any, format?: string, timezone?: string): string {
    return super.transform(value, format, timezone, 'en');
  }
}
