import { Injectable } from '@angular/core';
import { GlobalMessageService } from '@spartacus/core';
import { Observable, Observer } from 'rxjs';
import {
  FileValidity,
  FileValidityConfig,
} from '../../config/file-validity-config';

// TODO: move to other file
export type InvalidFileInfo = {
  fileTooLarge?: Boolean;
  invalidExtension?: Boolean;
  fileEmpty?: Boolean;
};

@Injectable({
  providedIn: 'root',
})
export class ImportExportService {
  constructor(
    protected globalMessageService: GlobalMessageService,
    protected fileValidityConfig: FileValidityConfig
  ) {}

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

  protected setValidityConfig(validityConfig: FileValidity): FileValidity {
    return { ...this.fileValidityConfig.fileValidity, ...validityConfig };
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
  dataToCsv(objectsArray: object[]): string {
    const separator = ',';
    const array =
      typeof objectsArray != 'object' ? JSON.parse(objectsArray) : objectsArray;

    return array.reduce((str, row) => {
      const line = Object.keys(row).reduce(
        (currentLine, cell) =>
          `${currentLine}${currentLine != '' ? separator : ''}\"${row[cell]}\"`,
        ''
      );
      return `${str}${line}\r\n`;
    }, '');
  }
}
