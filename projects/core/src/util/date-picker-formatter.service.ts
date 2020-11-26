// TODO: Reenable and improve for usage #9753

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class DatePickerFormatterService {
//   constructor() {}

//   toNative(value: string): string {
//     return value ? new Date(value).toISOString().split('T')[0] : null;
//   }

//   toModel(value: string, endOfDay: boolean): string {
//     if (value) {
//       let date = new Date(value)
//         .toISOString()
//         .replace('.', '+')
//         .replace('Z', '0');

//       if (endOfDay) {
//         date = date.replace('00:00:00', '23:59:59');
//       }
//       return date;
//     }
//   }
// }
