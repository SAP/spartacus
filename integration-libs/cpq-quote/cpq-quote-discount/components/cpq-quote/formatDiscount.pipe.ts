import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDiscount',
})
export class FormatDiscountPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value === undefined) return '';
    return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(2);
  }
}
