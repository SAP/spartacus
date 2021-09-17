import { Injectable } from '@angular/core';
import { ImportExportConfig } from '../config/import-export-config';

@Injectable({
  providedIn: 'root',
})
export class ExportCsvService {
  constructor(protected importExportConfig: ImportExportConfig) {}

  private get separator() {
    return this.importExportConfig.cartImportExport?.file.separator ?? ',';
  }

  /**
   * Converts array of objects into CSV data structure.
   *
   * @param {string[][]} objectsArray Array of objects which should be converted to CSV.
   * @param {number} [maxLines] Maximum number of ilnes in final CSV data.
   * @returns {string} Processed string ready to be saved into file.
   */
  dataToCsv(objectsArray: string[][], maxLines?: number): string {
    const array =
      typeof objectsArray != 'object' ? JSON.parse(objectsArray) : objectsArray;
    return array.reduce(
      (csvString: string, row: string[], index: number, result: string[]) => {
        if (maxLines && maxLines === index + 1) {
          result.splice(maxLines);
        }
        const line = row.reduce((currentLine, column) => {
          currentLine += currentLine !== '' ? this.separator : '';
          const cell = column.includes(this.separator) ? `"${column}"` : column;
          return `${currentLine}${cell}`;
        }, '');
        return `${csvString}${line}\r\n`;
      },
      ''
    );
  }

  downloadCsv(
    csvData: string,
    {
      fileName = 'data',
      extension = 'csv',
      type = 'text/csv;charset=utf-8;',
      downloadDelay = 0,
    } = {}
  ) {
    setTimeout(() => {
      const blob = new Blob(['\ufeff' + csvData], {
        type,
      });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', `${fileName}.${extension}`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, downloadDelay);
  }
}
