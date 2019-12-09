import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cxDate' })
export class MockDatePipe extends DatePipe implements PipeTransform {
  transform(value: any, format?: string, timezone?: string): string {
    return super.transform(value, format, timezone, 'en');
  }
}
