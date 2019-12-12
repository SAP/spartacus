import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateFormatterService {
  constructor() {}

  transform(value: string) {
    return value.replace('.','+')
  }
}
