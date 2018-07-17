import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'yDate' })
export class YDatePipe implements PipeTransform {
  // TODO: read local from session storage
  transform(date: string) {
    const dateObj = new Date(date);
    const local = 'en-US';
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return dateObj.toLocaleDateString(local, options);
  }
}
