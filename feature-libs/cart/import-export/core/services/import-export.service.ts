import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ImportExportConfig } from '../config/import-export-config';
import { FileValidity, InvalidFileInfo } from '../model';

@Injectable({
  providedIn: 'root',
})
export class ImportExportService {
  constructor(protected importExportConfig: ImportExportConfig) {}

  importFile(
    selectedFile: FileList,
    checkValidityEnabled?: Boolean,
    validityConfig?: FileValidity
  ): Observable<unknown> {
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
          observer.next(fileReader.result as string);
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

  protected setValidityConfig(
    validityConfig: FileValidity | undefined
  ): FileValidity {
    return { ...this.importExportConfig.fileValidity, ...validityConfig };
  }

  protected checkValidity(
    file: File,
    validityConfig?: FileValidity
  ): { isFileValid: Boolean; invalidFileInfo: InvalidFileInfo } {
    let isFileValid: Boolean = true;
    let invalidFileInfo: InvalidFileInfo = {};
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
          `${currentLine}${
            currentLine !== '' ? this.importExportConfig.file.separator : ''
          }"${row[cell]}"`,
        ''
      );
      return `${str}${line}\r\n`;
    }, '');
  }
}
