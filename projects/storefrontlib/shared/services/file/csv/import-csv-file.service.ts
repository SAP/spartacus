import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { FileReaderService } from '../file-reader.service';
import { CsvFileValidationErrors } from './csv-file-validation-errors';

@Injectable({
  providedIn: 'root',
})
export class ImportCsvFileService {
  constructor(protected fileReaderService: FileReaderService) {}
  /**
   * Load CSV file.
   *
   * @param file File we want to load as CSV.
   * @param separator Separator for CSV data.
   * @return {Observable<string[][]>} Imported file
   */
  loadFile(file: File, separator: string): Observable<string[][]> {
    return this.fileReaderService
      .loadTextFile(file)
      .pipe(map((res) => this.parse(res as string, separator)));
  }

  /**
   * Combined csv validation
   *
   * @param file File we want to load as CSV.
   * @param separator Separator for CSV data.
   * @param isDataParsable (optional) Callback for verify that structure type is proper.
   * @param maxEntries (optional) Limitation for maximum entries count.
   * @return {Observable<CsvFileValidationErrors | null>} Result of validation
   */
  validateFile(
    file: File,
    {
      separator,
      isDataParsable,
      maxEntries,
    }: {
      separator: string;
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
        this.validateNotParsable(data, errors, isDataParsable);
        this.validateTooManyEntries(data, errors, maxEntries);
      }),
      catchError((errors) => of(errors)),
      map(() => (Object.keys(errors).length === 0 ? null : errors))
    );
  }

  /**
   * Processes the CSV data
   *
   * @param csvString raw extracted data from CSV
   * @param separator for csv data
   * @param ignoreHeader (optional) flag allows for ignore headers row while reading
   * @returns {string[][]} Parsed file
   */
  protected parse(
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

  protected validateNotParsable(
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
