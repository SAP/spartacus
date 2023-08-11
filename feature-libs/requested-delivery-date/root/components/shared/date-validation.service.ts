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
        new Date(value.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')).getDate() //convert 'dd-mm-yyyy' into 'mm/dd/yyyy'
      )
    );
  }
}
