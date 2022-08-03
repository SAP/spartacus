import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FilesFormValidators {
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
      if (maxSize) {
        const files: File[] = Array.from(control.value);
        files.forEach((file: File) => {
          if (file.size > maxSize * 1000000) {
            const invalidFiles = errors.tooLarge?.invalidFiles ?? [];
            errors.tooLarge = {
              maxSize,
              invalidFiles: [...invalidFiles, file.name],
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
      if (maxEntries) {
        const files: File[] = Array.from(control.value);
        if (files.length > maxEntries) {
          errors.tooManyEntries = { maxEntries };
        }
      }
      return Object.keys(errors).length === 0 ? null : errors;
    };
  }
}
