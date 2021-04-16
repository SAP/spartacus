import { Injectable } from '@angular/core';
import { ImportExportConfig } from '../config/import-export-config';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor(protected importExportConfig: ImportExportConfig) {}

  private get separator() {
    return this.importExportConfig.importExport.file.separator;
  }

  /**
   * Converts array of objects into CSV data structure.
   *
   * @param objectsArray Array of objects which should be converted to CSV.
   * @returns Processed string ready to be saved into file
   */
  dataToCsv<T extends { [key: string]: unknown }>(objectsArray: T[]): string {
    const array =
      typeof objectsArray != 'object' ? JSON.parse(objectsArray) : objectsArray;

    return array.reduce((csvString: string, row: T) => {
      const line = Object.keys(row).reduce((currentLine, column) => {
        currentLine += currentLine !== '' ? this.separator : '';
        const cell =
          typeof row[column] === 'string' &&
          (row[column] as string).includes(this.separator)
            ? `"${row[column]}"`
            : row[column];

        return `${currentLine}${cell}`;
      }, '');
      return `${csvString}${line}\r\n`;
    }, '');
  }
}
