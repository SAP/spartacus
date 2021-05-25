// TODO: Reenable and improve for usage #9753

// import { Injectable } from '@angular/core';

// export enum DATETIME_PICKER_INPUT_TYPE {
//   DATETIME_LOCAL = 'datetime-local',
//   DATE = 'date',
// }

// /**
//  * Service responsible for converting date-like strings to/from formats compatible with the date-like input element
//  * HTML element and valid strings compatible with the `Date` object.
//  *
//  * Date values used are relative to the local timezone of the user.
//  */
// @Injectable({
//   providedIn: 'root',
// })
// export class DateTimePickerFormatterService {
//   /**
//    * Convert date string into a string format compatable with the browser's native date-like input element.
//    * @param value: date string to convert
//    *
//    * @example
//    * With UTC-0 local offset, `toNative('2010-01-01T00:00+0000')` returns `'2010-01-01T00:00' or `'2010-01-01'`
//    * depending on the input type.
//    */
//   toNative(value: string, inputType: DATETIME_PICKER_INPUT_TYPE): string {
//     switch (inputType) {
//       case DATETIME_PICKER_INPUT_TYPE.DATETIME_LOCAL:
//         return value
//           ? this.formatDateStringWithTimezone(
//               value,
//               this.getLocalTimezoneOffset(true)
//             )
//           : null;
//       case DATETIME_PICKER_INPUT_TYPE.DATE:
//         return value ? new Date(value).toLocaleDateString() : null;
//     }
//   }

//   /**
//    * Convert datetime-local native string into a valid datetime string.
//    * @param value: input date-like string to convert
//    *
//    * @example

//    * datetime-locatl: With UTC-0 locale offset, `toModel('2010-01-01T00:00')` returns `'2010-01-01T00:00:00+00:00'`.
//    * date: With UTC-0 locale offset, `toModel('2010-01-01')` returns `'2010-01-01T00:00:00+00:00'`.
//    */
//   toModel(value: string, inputType: DATETIME_PICKER_INPUT_TYPE): string {
//     switch (inputType) {
//       case DATETIME_PICKER_INPUT_TYPE.DATETIME_LOCAL:
//         return value ? `${value}:00${this.getLocalTimezoneOffset()}` : null;
//       case DATETIME_PICKER_INPUT_TYPE.DATE:
//         return value
//           ? `${value}T00:00:00${this.getLocalTimezoneOffset()}`
//           : null;
//     }
//   }

//   /**
//    * Returns the local timezone in a format that can be appended to a date-like string.
//    * @param invert (default: false): returns the opposite operator relative to the local timezone
//    *
//    * @example
//    * When locale is set to a CEST timezone, `getLocalTimezoneOffset()` returns '+02:00'
//    * and `getLocalTimezoneOffset(true)` returns '-02:00'
//    */
//   protected getLocalTimezoneOffset(invert?: boolean): string {
//     const offset = new Date().getTimezoneOffset() * -1;
//     const hours = Math.abs(Math.floor(offset / 60))
//       .toString()
//       .padStart(2, '0');
//     const minutes = (offset % 60).toString().padStart(2, '0');
//     const sign = offset >= 0 ? (invert ? `-` : `+`) : invert ? `+` : `-`;
//     return `${sign}${hours}:${minutes}`;
//   }

//   /**
//    * Format date string into a format compatible with the browser's native `<input type="datetime-local">` HTML element.
//    * @param dateString: date string to convert
//    * @param offset: offset to append to date string
//    *
//    * @example
//    * With UTC-0 local offset, `formatDateStringWithTimezone('2010-01-01T00:00+0000', '+00:00')` returns `'2010-01-01T00:00+00:00'`.
//    */
//   protected formatDateStringWithTimezone(
//     dateString: string,
//     offset: string
//   ): string {
//     return new Date(dateString.replace('+0000', offset))
//       .toISOString()
//       .substring(0, 16);
//   }
// }
