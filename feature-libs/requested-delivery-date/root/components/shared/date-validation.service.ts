/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateValidationService {
  /**
   * Validates if the string is containing a date string.
   * @param value Date string in the format 'dd-mm-yyy'
   * @returns true if valid, false if invalid
   */
  isDateStringValid(value: string | undefined): boolean {
    return (
      value != null &&
      value !== undefined &&
      value.length > 0 &&
      !isNaN(
        this.getDateFromDateString(value).getDate() //convert 'dd-mm-yyyy' into 'mm/dd/yyyy'
      )
    );
  }

  /**
   * Compares 2 Date strings in the format 'dd-mm-yyy'
   * @param date1 Date string in the format 'dd-mm-yyy'
   * @param date2 Date string in the format 'dd-mm-yyy'
   * @returns -1 if date2 is greater, 0 if both the dates are equal, 1 if date1 is greater, -2 for invalid inputs
   */
  compareDateStrings(date1: string, date2: string): number {
    if (date1.length === 0 || date2.length === 0) {
      return -2;
    }
    const d1 = this.getDateFromDateString(date1);
    const d2 = this.getDateFromDateString(date2);
    if (d1 < d2) {
      return -1;
    }

    return d1 > d2 ? 1 : 0;
  }

  /**
   * Returns a Date object from a date string in the format 'dd-mm-yyy'
   * @param value Date string in the format 'dd-mm-yyy'
   */
  getDateFromDateString(value: string): Date {
    return new Date(value.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'));
  }

  /**
   * Checks if the source date is greater than or equal to the target
   * @param source Date string in the format 'dd-mm-yyy'
   * @param target Date string in the format 'dd-mm-yyy'
   * @returns true if `source` date is greater than or equal to `target` date
   */
  isDateGreaterOrEqual(source: string, target: string): boolean {
    return this.compareDateStrings(source, target) >= 0;
  }
}
