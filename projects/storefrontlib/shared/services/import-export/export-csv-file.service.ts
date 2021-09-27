import { Injectable } from '@angular/core';
import { FileOptions } from '../../models/file';
import { FileDownloadService } from './file-download.service';

@Injectable({
  providedIn: 'root',
})
export class ExportCsvFileService {
  constructor(protected fileDownloadService: FileDownloadService) {}
  /**
   * Converts array of objects into CSV data structure.
   *
   * @param objectsArray Array of objects which should be converted to CSV.
   * @param separator for csv data
   * @returns Processed string ready to be saved into file
   */
  convert(objectsArray: string[][], separator: string): string {
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
   * @param separator for csv data
   * @param fileOptions FileOptions
   * @returns Processed string ready to be saved into file
   */
  download(
    objectsArray: string[][],
    separator: string,
    fileOptions: FileOptions
  ): void {
    this.fileDownloadService.download(
      this.convert(objectsArray, separator),
      fileOptions
    );
  }
}
