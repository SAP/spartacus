import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImportCsvService } from './import-csv.service';

@Injectable()
export class FilesFormValidators {
  constructor(protected importCsvService: ImportCsvService) {}
  /**
   * Checks max size of file
   *
   * @static
   * @param {number} maxSize Max size [MB]
   * @returns Uses 'tooLarge' validator error with maxSize property
   * @memberof CustomFormValidators
   */

  maxSize(maxSize?: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const errors: ValidationErrors = {};
      const files: File[] = Array.from(control.value);
      files.forEach((file: File) => {
        if (maxSize && file.size / 1000000 > maxSize) {
          errors.tooLarge = { maxSize };
        }
      });
      return Object.keys(errors).length === 0 ? null : errors;
    };
  }

  // emptyFile(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const errors: ValidationErrors = {};
  //   const file: File = control.value[0];
  //   return this.importCsvService.loadCsvData(file).pipe(
  //     map((data: string[][]) => {
  //       if (data.toString().length === 0) {
  //         errors.empty = true;
  //       }
  //     }),
  //     map(() => (Object.keys(errors).length === 0 ? null : errors))
  //   );
  // }
  //
  // parsableFile(
  //   isDataParsable: (data: string[][]) => Boolean
  // ): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //     const errors: ValidationErrors = {};
  //     const file: File = control.value[0];
  //     return this.importCsvService.loadCsvData(file).pipe(
  //       map((data: string[][]) => {
  //         if (!isDataParsable(data)) {
  //           errors.notParsable = true;
  //         }
  //       }),
  //       map(() => (Object.keys(errors).length === 0 ? null : errors))
  //     );
  //   };
  // }

  emptyFile(importCsvService: ImportCsvService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const errors: ValidationErrors = {};
      const file: File = control.value[0];
      return importCsvService.loadCsvData(file).pipe(
        map((data: string[][]) => {
          if (data.toString().length === 0) {
            errors.empty = true;
          }
        }),
        map(() => (Object.keys(errors).length === 0 ? null : errors))
      );
    };
  }

  parsableFile(
    importCsvService: ImportCsvService,
    isDataParsable: (data: string[][]) => Boolean
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const errors: ValidationErrors = {};
      const file: File = control.value[0];
      return importCsvService.loadCsvData(file).pipe(
        map((data: string[][]) => {
          if (!isDataParsable(data)) {
            errors.notParsable = true;
          }
        }),
        map(() => (Object.keys(errors).length === 0 ? null : errors))
      );
    };
  }
}
