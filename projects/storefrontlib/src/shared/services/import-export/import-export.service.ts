import { Injectable } from '@angular/core';
import { GlobalMessageService } from '@spartacus/core';
import { Observable, Observer } from 'rxjs';

// TODO: move to other file
export type FileValidityConfig = {
  maxSize?: Number;
  allowedExtensions?: string[];
  checkEmptyFile?: Boolean;
};

export type InvalidFileInfo = {
  fileTooLarge?: Boolean;
  invalidExtension?: Boolean;
  fileEmpty?: Boolean;
};

@Injectable({
  providedIn: 'root',
})
export class ImportExportService {
  constructor(protected globalMessageService: GlobalMessageService) {}
  // size unit is MB
  protected maxSize = 1;
  protected allowedExtensions = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv',
  ];

  importFile(
    selectedFile: FileList,
    checkValidityEnabled?: Boolean,
    validityConfig?: FileValidityConfig
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

  protected setValidityConfig(validityConfig): FileValidityConfig {
    return {
      maxSize: validityConfig?.maxSize ?? this.maxSize,
      allowedExtensions:
        validityConfig?.allowedExtensions ?? this.allowedExtensions,
    };
  }

  protected checkValidity(
    file: File,
    validityConfig?: FileValidityConfig
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
    let array =
      typeof objectsArray != 'object' ? JSON.parse(objectsArray) : objectsArray;
    let str = '';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (var index in array[i]) {
        if (line != '') line += ',';
        line += array[i][index];
      }
      str += line + '\r\n';
    }

    return str;
  }
}
