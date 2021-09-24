import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ImportService } from './import.service';

@Injectable({
  providedIn: 'root',
})
export class ImportCsvService {
  constructor(protected importService: ImportService) {}
  /**
   * Processes the CSV data
   *
   * @param csvString raw extracted data from CSV
   * @param ignoreHeader flag allows for ignore headers row while reading
   * @param separator for csv data
   * @returns Processed data containing productCode and quantity
   */
  readCsvData(
    csvString: string,
    separator: string,
    ignoreHeader = true
  ): string[][] {
    return csvString
      .split('\n')
      .map((row) => row.split(separator).map((cell) => cell.replace(/"/g, '')))
      .filter(
        (value, index) => !(ignoreHeader && index === 0) && value[0] !== ''
      );
  }

  loadCsvData(file: File, separator: string): Observable<string[][]> {
    return this.importService
      .loadTextFile(file)
      .pipe(map((res) => this.readCsvData(res as string, separator)));
  }

  isReadableFile(
    separator: string,
    isDataParsable?: (data: string[][]) => boolean
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const errors: ValidationErrors = {};
      const file: File = control.value[0];
      return (this.importService.loadTextFile(file) as Observable<string>).pipe(
        tap((data: string) => {
          this.validEmpty(data, errors);
        }),
        map((res) => this.readCsvData(res, separator)),
        tap((data: string[][]) => {
          this.validTooManyEntries(data, errors);
          this.validNotParsable(data, errors, isDataParsable);
        }),
        map(() => (Object.keys(errors).length === 0 ? null : errors))
      );
    };
  }

  protected validEmpty(data: string, errors: ValidationErrors) {
    if (data.toString().length === 0) {
      errors.empty = true;
    }
  }

  protected validTooManyEntries(
    data: string[][],
    errors: ValidationErrors,
    maxEntries?: number
  ) {
    if (maxEntries && data.length > maxEntries) {
      errors.tooManyEntries = { maxEntries };
    }
  }

  protected validNotParsable(
    data: string[][],
    errors: ValidationErrors,
    isDataParsable?: (data: string[][]) => boolean
  ) {
    if (!errors.empty && isDataParsable && !isDataParsable(data)) {
      errors.notParsable = true;
    }
  }
}
