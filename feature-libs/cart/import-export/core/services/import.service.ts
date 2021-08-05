import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ImportExportConfig } from '../config/import-export-config';

@Injectable({
  providedIn: 'root',
})
export class ImportService {
  constructor(protected importExportConfig: ImportExportConfig) {}

  /**
   * Extracts CSV file and process into a JSON data
   *
   * @param file CSV file to extract the data
   * @returns processed data from CSV or error data in CSV extraction
   */
  loadFile(file: File): Observable<string | ProgressEvent<FileReader>> {
    return new Observable((observer: Observer<string>) => {
      const fileReader: FileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = () => {
        observer.next(fileReader.result as string);
        observer.complete();
      };
      fileReader.onerror = (error) => {
        fileReader.abort();
        observer.error(error);
      };
    });
  }

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

  private get separator() {
    return this.importExportConfig.importExport?.file.separator ?? ',';
  }
}
