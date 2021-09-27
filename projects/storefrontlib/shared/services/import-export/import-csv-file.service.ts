import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CsvFileValidationErrors } from '../../models/file';
import { FileReaderService } from './file-reader.service';

@Injectable({
  providedIn: 'root',
})
export class ImportCsvFileService {
  constructor(protected fileReaderService: FileReaderService) {}
  /**
   * Processes the CSV data
   *
   * @param csvString raw extracted data from CSV
   * @param ignoreHeader flag allows for ignore headers row while reading
   * @param separator for csv data
   * @returns Processed data containing productCode and quantity
   */
  parse(csvString: string, separator: string, ignoreHeader = true): string[][] {
    return csvString
      .split('\n')
      .map((row) => row.split(separator).map((cell) => cell.replace(/"/g, '')))
      .filter(
        (value, index) => !(ignoreHeader && index === 0) && value[0] !== ''
      );
  }

  loadFile(file: File, separator: string): Observable<string[][]> {
    return this.fileReaderService
      .loadTextFile(file)
      .pipe(map((res) => this.parse(res as string, separator)));
  }

  validateFile(
    file: File,
    {
      separator,
      isDataParsable,
      maxEntries,
    }: {
      separator?: string;
      isDataParsable?: (data: string[][]) => boolean;
      maxEntries?: number;
    }
  ): Observable<CsvFileValidationErrors | null> {
    const errors: CsvFileValidationErrors = {};
    return (
      this.fileReaderService.loadTextFile(file) as Observable<string>
    ).pipe(
      tap((data: string) => {
        this.validateEmpty(data, errors);
      }),
      map((res) => this.parse(res, separator)),
      tap((data: string[][]) => {
        this.validNotParsable(data, errors, isDataParsable);
        this.validateTooManyEntries(data, errors, maxEntries);
      }),
      catchError((errors) => of(errors)),
      map(() => (Object.keys(errors).length === 0 ? null : errors))
    );
  }

  protected validateEmpty(data: string, errors: ValidationErrors): void {
    if (data.toString().length === 0) {
      errors.empty = true;
      throw errors;
    }
  }

  protected validateTooManyEntries(
    data: string[][],
    errors: ValidationErrors,
    maxEntries?: number
  ): void {
    if (maxEntries && data.length > maxEntries) {
      errors.tooManyEntries = { maxEntries };
      throw errors;
    }
  }

  protected validNotParsable(
    data: string[][],
    errors: ValidationErrors,
    isDataParsable?: (data: string[][]) => boolean
  ): void {
    if (isDataParsable && !isDataParsable(data)) {
      errors.notParsable = true;
      throw errors;
    }
  }
}
