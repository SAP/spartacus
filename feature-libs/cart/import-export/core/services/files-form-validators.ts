import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ImportCsvService } from './import-csv.service';

@Injectable({
  providedIn: 'root',
})
export class FilesFormValidators {
  constructor(protected importCsvService: ImportCsvService) {}
  /**
   * Checks max size of file
   *
   * @param {number} maxSize Max size [MB]
   * @returns Uses 'tooLarge' validator error with maxSize property
   * @memberof FilesFormValidators
   */
  maxSize(maxSize?: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const errors: ValidationErrors = {};
      if (maxSize) {
        const files: File[] = Array.from(control.value);
        files.forEach((file: File) => {
          if (file.size / 1000000 > maxSize) {
            errors.tooLarge = { maxSize };
          }
        });
      }
      return Object.keys(errors).length === 0 ? null : errors;
    };
  }

  /**
   * Checks max lines of file
   *
   * @param {number} maxLines
   * @returns Uses 'tooManyItems' validator error with maxLines property
   * @memberof FilesFormValidators
   */
  maxLines(maxLines?: number): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const errors: ValidationErrors = {};
      const file: File = control.value[0];
      return this.importCsvService.loadCsvData(file).pipe(
        tap((data: string[][]) => {
          if (maxLines && data.length > maxLines) {
            errors.tooManyLines = { maxLines };
          }
        }),
        map(() => (Object.keys(errors).length === 0 ? null : errors))
      );
    };
  }

  /**
   * Checks empty file
   *
   * @returns Uses 'empty' validator error
   * @memberof FilesFormValidators
   */
  emptyFile(control: AbstractControl): Observable<ValidationErrors | null> {
    const errors: ValidationErrors = {};
    const file: File = control.value[0];
    return (this.importCsvService.loadFile(file) as Observable<string>).pipe(
      tap((data: string) => {
        if (data.length === 0) {
          errors.empty = true;
        }
      }),
      map(() => (Object.keys(errors).length === 0 ? null : errors))
    );
  }

  /**
   * Checks file is parsable
   *
   * @param {(data: string[][]) => Boolean} isDataParsable Callback which verify that file text is in expected structure
   * @returns Uses 'notParsable' validator error
   * @memberof FilesFormValidators
   */
  parsableFile(
    isDataParsable: (data: string[][]) => Boolean
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const errors: ValidationErrors = {};
      const file: File = control.value[0];
      return this.importCsvService.loadCsvData(file).pipe(
        tap((data: string[][]) => {
          if (!isDataParsable(data)) {
            errors.notParsable = true;
          }
        }),
        map(() => (Object.keys(errors).length === 0 ? null : errors))
      );
    };
  }

  /**
   * Checks file is not empty and parsable
   *
   * @param {(data: string[][]) => Boolean} isDataParsable? Callback which verify that file text is in expected structure
   * @returns Uses 'empty' and 'notParsable' validator error
   * @memberof FilesFormValidators
   */
  readableFile(
    isDataParsable?: (data: string[][]) => Boolean
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const errors: ValidationErrors = {};
      const file: File = control.value[0];
      return (this.importCsvService.loadFile(file) as Observable<string>).pipe(
        tap((data: string) => {
          if (data.toString().length === 0) {
            errors.empty = true;
          }
        }),
        map((res) => this.importCsvService.readCsvData(res)),
        tap((data: string[][]) => {
          if (!errors.empty && isDataParsable && !isDataParsable(data)) {
            errors.notParsable = true;
          }
        }),
        map(() => (Object.keys(errors).length === 0 ? null : errors))
      );
    };
  }
}
