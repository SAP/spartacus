import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ImportExportConfig } from '../config/import-export-config';
import {
  ColumnData,
  FileValidity,
  InvalidFileInfo,
  ProductsData,
} from '../model';

@Injectable({
  providedIn: 'root',
})
export class ImportExportService {
  constructor(protected importExportConfig: ImportExportConfig) {}

  /**
   * Extracts CSV file and process into a JSON data
   *
   * @param selectedFile CSV file to extract the data
   * @param columnData object which provides info of required columns
   * @param checkValidityEnabled optional flag to disable the validity check
   * @param validityConfig optional object to pass any custom validity config
   * @returns processed data from CSV or error data in CSV extraction
   */
  csvToData(
    selectedFile: FileList,
    columnData: ColumnData,
    checkValidityEnabled?: Boolean,
    validityConfig?: FileValidity
  ): Observable<ProductsData | unknown> {
    const file: File = selectedFile.item(0) as File;
    return new Observable((observer: Observer<unknown>) => {
      const fileReader: FileReader = new FileReader();
      const checkValidity = this.checkValidity(file, validityConfig);
      if (
        !checkValidityEnabled ||
        (checkValidityEnabled && checkValidity.isFileValid)
      ) {
        fileReader.readAsText(file);
        fileReader.onload = () => {
          observer.next(
            this.processCsvData(fileReader.result as string, columnData)
          );
          observer.complete();
        };
        fileReader.onerror = () => {
          fileReader.abort();
          observer.error(new DOMException('Could not parse the file'));
        };
      } else {
        observer.error(checkValidity.invalidFileInfo);
      }
    });
  }

  /**
   * Combines passed validity config with default
   *
   * @param validityConfig optional validity config if passed from parent component
   * @returns default validity config overridden by passed validity configs
   */
  protected setValidityConfig(
    validityConfig: FileValidity | undefined
  ): FileValidity {
    return {
      ...this.importExportConfig.importExport.fileValidity,
      ...validityConfig,
    };
  }

  /**
   * Checks validity of the file
   *
   * @param file CSV file to check
   * @param validityConfig optional object to pass any custom validity config
   * @returns validity boolean and invalid file information object if any
   */
  protected checkValidity(
    file: File,
    validityConfig?: FileValidity
  ): { isFileValid: Boolean; invalidFileInfo: InvalidFileInfo } {
    let isFileValid: Boolean = true;
    const invalidFileInfo: InvalidFileInfo = {};
    validityConfig = this.setValidityConfig(validityConfig);
    if (
      validityConfig?.maxSize &&
      file.size / 1000000 > validityConfig?.maxSize
    ) {
      isFileValid = false;
      invalidFileInfo.fileTooLarge = true;
    }
    if (!validityConfig?.allowedExtensions?.includes(file.type)) {
      isFileValid = false;
      invalidFileInfo.invalidExtension = true;
    }
    if (validityConfig?.checkEmptyFile && file.size === 0) {
      isFileValid = false;
      invalidFileInfo.fileEmpty = true;
    }
    return { isFileValid, invalidFileInfo };
  }

  private get separator() {
    return this.importExportConfig.importExport.file.separator;
  }
  /**
   * Processes the CSV data and convert into JSON
   *
   * @param data raw extracted data from CSV
   * @param columnData object which provides info of required columns
   * @returns Processed JSON containing productCode and quantity
   */
  protected processCsvData(data: string, columnData: ColumnData): any {
    let headers: string[];
    return data
      .split('\n')
      .map((row, index) => {
        const convertedRow = row
          .split(this.separator)
          .map((cell) => cell.replace(/"/g, ''));
        if (index === 0) {
          return (headers = convertedRow);
        } else {
          return convertedRow
            .filter((_cell, index) =>
              this.filterColumn(index, headers, Object.keys(columnData))
            )
            .map((cell, index) =>
              this.parseData(cell, index, headers, columnData)
            );
        }
      })
      .filter((value, index) => index !== 0 && value[0] !== '')
      .map((data) => {
        return this.mapData(data, columnData);
      });
  }

  protected parseData(
    cell: string,
    index: number,
    headers: string[],
    columnData: ColumnData
  ): number | string {
    switch (columnData[headers[index]?.toLowerCase()]) {
      case 'number':
        return Number(cell);

      case 'string':
        return cell;

      default:
        return cell;
    }
  }

  protected filterColumn(
    index: number,
    headers: string[],
    columnData: string[]
  ): boolean {
    return columnData.includes(headers[index]?.toLowerCase());
  }

  protected mapData(data: (string | number)[], columnData: ColumnData) {
    const json: any = {};
    Object.keys(columnData).map((key, index) => {
      json[key] = data[index];
    });
    return json;
  }

  /**
   * Converts array of objects into CSV data structure.
   *
   * @param objectsArray Array of objects which should be converted to CSV.
   */
  dataToCsv<T extends { [key: string]: unknown }>(objectsArray: T[]): string {
    const array =
      typeof objectsArray != 'object' ? JSON.parse(objectsArray) : objectsArray;

    return array.reduce((str: string, row: T) => {
      const line = Object.keys(row).reduce(
        (currentLine, cell) =>
          `${currentLine}${currentLine !== '' ? this.separator : ''}"${
            row[cell]
          }"`,
        ''
      );
      return `${str}${line}\r\n`;
    }, '');
  }
}
