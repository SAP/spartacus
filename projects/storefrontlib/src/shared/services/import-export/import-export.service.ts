import { Injectable } from '@angular/core';
import { GlobalMessageService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ImportExportService {
  constructor(protected globalMessageService: GlobalMessageService) {}
  // size unit is MB
  private maxSize = 1;
  private allowedExtensions = ['text/csv'];

  importFile(
    selectedFile: FileList,
    checkValidityEnabled?: Boolean,
    validityConfig?: {
      maxSize?: Number;
      allowedExtensions?: string[];
      checkEmptyFile?: Boolean;
    }
  ): Promise<any> {
    const file: File = selectedFile.item(0) as File;
    return new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      if (checkValidityEnabled) {
        const checkValidity = this.checkValidity(file, validityConfig);
        if (checkValidity.isFileValid) {
          reader.onload = () => {
            resolve(reader.result as string);
          };
          reader.onerror = () => {
            reader.abort();
            reject(new DOMException('Could not parse the file'));
          };
        } else {
          reject(checkValidity.invalidFileInfo);
        }
      } else {
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.onerror = () => {
          reader.abort();
          reject(new DOMException('Could not parse the file'));
        };
      }
    });
  }

  private checkValidity(
    file: File,
    validityConfig?: {
      maxSize?: Number;
      allowedExtensions?: string[];
      checkEmptyFile?: Boolean;
    }
  ): { isFileValid: Boolean; invalidFileInfo: {} } {
    let isFileValid: Boolean = true;
    let invalidFileInfo: {
      fileTooLarge?: Boolean;
      invalidExtension?: Boolean;
      fileEmpty?: Boolean;
    } = {};
    if (!validityConfig) {
      validityConfig = {
        maxSize: this.maxSize,
        allowedExtensions: this.allowedExtensions,
      };
    }
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
