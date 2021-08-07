import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ImportCsvService } from 'feature-libs/cart/import-export/core/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FilesFormValidators {
  constructor(protected importService: ImportCsvService) {}
  /**
   * Checks max size of file
   *
   * @static
   * @param {number} maxSize Max size [MB]
   * @returns Uses 'tooLarge' validator error with maxSize property
   * @memberof CustomFormValidators
   */
  maxSize(maxSize: number): ValidatorFn {
    const validator = (control: AbstractControl): ValidationErrors | null => {
      const errors: ValidationErrors = {};
      if (control.value && Array.isArray(control.value)) {
        control.value.every((file: File) => {
          if (maxSize && file.size / 1000000 > maxSize) {
            errors.tooLarge = { maxSize };
          }
        });
      }
      return Object.keys(errors).length === 0 ? null : errors;
    };
    return validator;
  }

  emptyFile(control: AbstractControl): Observable<ValidationErrors | null> {
    const errors: ValidationErrors = {};
    const file: File = control.value[0];
    return this.importService.loadCsvData(file).pipe(
      map((data: string[][]) => {
        if (data.toString().length === 0) {
          errors.empty = true;
        }
      }),
      map(() => (Object.keys(errors).length === 0 ? null : errors))
    );
  }
}
