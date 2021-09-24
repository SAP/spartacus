import { Injectable } from '@angular/core';
import { FileOptions } from '../../models/file';
import { ExportService } from './export.service';

@Injectable({
  providedIn: 'root',
})
export class ExportCsvService {
  constructor(protected exportService: ExportService) {}
  /**
   * Converts array of objects into CSV data structure.
   *
   * @param objectsArray Array of objects which should be converted to CSV.
   * @param separator
   * @returns Processed string ready to be saved into file
   */
  dataToCsv(objectsArray: string[][], separator: string): string {
    const array =
      typeof objectsArray != 'object' ? JSON.parse(objectsArray) : objectsArray;
    return array.reduce((csvString: string, row: string[]) => {
      const line = row.reduce((currentLine, column) => {
        currentLine += currentLine !== '' ? separator : '';
        const cell = column.includes(separator) ? `"${column}"` : column;
        return `${currentLine}${cell}`;
      }, '');
      return `${csvString}${line}\r\n`;
    }, '');
  }

  /**
   * Downloads CSV file
   *
   * @param objectsArray Array of objects which should be converted to CSV.
   * @param separator string
   * @param fileOptions FileOptions
   * @returns Processed string ready to be saved into file
   */
  downloadCsv(
    objectsArray: string[][],
    separator: string,
    fileOptions: FileOptions
  ) {
    this.exportService.download(
      this.dataToCsv(objectsArray, separator),
      fileOptions
    );
  }
}
