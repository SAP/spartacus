import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

export type FileValidity = {
  // size unit is MB
  maxSize?: Number;
  allowedExtensions?: string[];
  checkEmptyFile?: Boolean;
};

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class FileValidityConfig {
  fileValidity: FileValidity;
}
