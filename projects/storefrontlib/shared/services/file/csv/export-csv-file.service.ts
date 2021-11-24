import { Injectable } from '@angular/core';
import { ExportFileOptions } from '../export-file-options';
import { FileDownloadService } from '../file-download.service';

@Injectable({
  providedIn: 'root',
})
export class ExportCsvFileService {
  constructor(protected fileDownloadService: FileDownloadService) {}
  /**
   * Converts array of objects into CSV data structure.
   *
   * @param objectsArray Array of objects which should be converted to CSV.
   * @param separator Separator for CSV data.
   * @returns Processed string ready to be saved into file.
   */
  protected convert(objectsArray: string[][], separator: string): string {
    return objectsArray.reduce((csvString: string, row: string[]) => {
      const line = row.reduce((currentLine, column) => {
        currentLine += currentLine !== '' ? separator : '';
        const cell = column.includes(separator) ? `"${column}"` : column;
        return `${currentLine}${cell}`;
      }, '');
      return `${csvString}${line}\r\n`;
    }, '');
  }

  /**
   * Creates and download CSV file.
   *
   * @param objectsArray Array of objects which should be converted to CSV.
   * @param separator Separator for CSV data.
   * @param fileOptions Exported file options.
   */
  download(
    objectsArray: string[][],
    separator: string,
    fileOptions: ExportFileOptions
  ): void {
    const { fileName, type, extension } = fileOptions;
    const fileContent = this.convert(objectsArray, separator);
    const blob = new Blob([fileContent], { type });
    const url = URL.createObjectURL(blob);

    this.fileDownloadService.download(url, `${fileName}.${extension}`);
  }
}
