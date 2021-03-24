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

  importFile(selectedFile: FileList): Promise<any> {
    const file: File = selectedFile.item(0) as File;
    const checkValidity = this.checkValidity(file);
    return new Promise((resolve, reject) => {
      if (checkValidity.isFileValid) {
        const reader: FileReader = new FileReader();
        reader.readAsText(file);
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
    });
  }

  private checkValidity(
    file: File
  ): { isFileValid: Boolean; invalidFileInfo: {} } {
    let isFileValid: Boolean = true;
    let invalidFileInfo = {
      fileTooLarge: false,
      invalidExtension: false,
      fileEmpty: false,
    };
    if (file.size / 1000000 > this.maxSize) {
      isFileValid = false;
      invalidFileInfo.fileTooLarge = true;
    }
    if (!this.allowedExtensions.includes(file.type)) {
      isFileValid = false;
      invalidFileInfo.invalidExtension = true;
    }
    if (file.size === 0) {
      isFileValid = false;
      invalidFileInfo.fileEmpty = true;
    }
    return { isFileValid, invalidFileInfo };
  }
}
