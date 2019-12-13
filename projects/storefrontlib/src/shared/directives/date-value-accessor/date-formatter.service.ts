import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateFormatterService {
  constructor() {}

  transform(value: string) {
    return new Date(value).toISOString().replace('.','+').replace('Z','0')
  }
}
