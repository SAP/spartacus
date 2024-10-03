/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FilesFormValidators {
  CONVERT_TO_MB = 1000000;
  extenstionRegEx: RegExp = /\.([0-9a-z]+)(?:[\?#]|$)/i;

  /**
   * Checks max size of file
   *
   * @param {number} maxSize Max size [MB]
   * @returns Uses 'tooLarge' validator error with maxSize property
   * @memberOf FilesFormValidators
   */
  maxSize(maxSize?: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const errors: ValidationErrors = {};
      if (maxSize && control.value) {
        const files: File[] = Array.from(control.value);
        files.forEach(({ size, name }) => {
          if (size > maxSize * this.CONVERT_TO_MB) {
            const invalidFiles = errors.tooLarge?.invalidFiles ?? [];
            errors.tooLarge = {
              maxSize,
              invalidFiles: [...invalidFiles, name],
            };
          }
        });
      }
      return Object.keys(errors).length === 0 ? null : errors;
    };
  }

  /**
   * Checks maximum entries
   *
   * @param {number} maxEntries Max number of entries
   * @returns Uses 'tooManyEntries' validator error with maxEntries property
   * @memberOf FilesFormValidators
   */
  maxEntries(maxEntries?: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const errors: ValidationErrors = {};
      if (maxEntries && control.value) {
        const files: File[] = Array.from(control.value);
        if (files.length > maxEntries) {
          errors.tooManyEntries = { maxEntries };
        }
      }
      return Object.keys(errors).length === 0 ? null : errors;
    };
  }

  /**
   * Checks allowed types
   *
   * @param {Array<string>} allowedTypes Allowed types of files
   * @returns Uses 'notParsable' validator error with allowedTypes property
   * @memberOf FilesFormValidators
   */
  allowedTypes(allowedTypes?: Array<string>): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const errors: ValidationErrors = {};
      if (allowedTypes && control.value) {
        const files: File[] = Array.from(control.value);
        errors.fileNotAllowed = files.some(
          ({ name }) => !allowedTypes.includes(this.getExtension(name))
        );
      }
      return errors[Object.keys(errors)?.[0]] ? errors : null;
    };
  }

  protected getExtension(filename?: string): string {
    return (filename?.match(this.extenstionRegEx) || [])[0] || '';
  }
}
