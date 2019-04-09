import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe as NativeDatePipe } from '@angular/common';

@Pipe({ name: 'cxDate' })
export class MockDatePipe extends NativeDatePipe implements PipeTransform {
  transform(value: any, format?: string, timezone?: string): string {
    return super.transform(value, format, timezone, 'en');
  }
}
