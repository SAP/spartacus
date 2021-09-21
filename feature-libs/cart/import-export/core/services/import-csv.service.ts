import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ImportExportConfig } from '../config/import-export-config';
import { ImportService } from './import.service';

@Injectable({
  providedIn: 'root',
})
export class ImportCsvService {
  constructor(
    protected importExportConfig: ImportExportConfig,
    protected importService: ImportService
  ) {}
  /**
   * Processes the CSV data
   *
   * @param csvString raw extracted data from CSV
   * @param ignoreHeader flag allows for ignore headers row while reading
   * @returns Processed data containing productCode and quantity
   */
  readCsvData(csvString: string, ignoreHeader = true): string[][] {
    return csvString
      .split('\n')
      .map((row) =>
        row.split(this.separator).map((cell) => cell.replace(/"/g, ''))
      )
      .filter(
        (value, index) => !(ignoreHeader && index === 0) && value[0] !== ''
      );
  }

  loadCsvData(file: File): Observable<string[][]> {
    return this.importService
      .loadTextFile(file)
      .pipe(map((res) => this.readCsvData(res as string)));
  }

  isReadableFile(
    isDataParsable?: (data: string[][]) => boolean
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const errors: ValidationErrors = {};
      const file: File = control.value[0];
      return (this.importService.loadTextFile(file) as Observable<string>).pipe(
        tap((data: string) => {
          this.validEmpty(data, errors);
        }),
        map((res) => this.readCsvData(res)),
        tap((data: string[][]) => {
          this.validTooManyLines(data, errors);
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

  protected validTooManyLines(data: string[][], errors: ValidationErrors) {
    if (this.maxLines && data.length > this.maxLines) {
      errors.tooManyLines = { maxLines: this.maxLines };
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

  protected get separator(): string {
    return this.importExportConfig.cartImportExport?.file.separator ?? ',';
  }

  protected get maxLines(): number | undefined {
    return this.importExportConfig.cartImportExport?.import?.fileValidity
      ?.maxLines;
  }
}
