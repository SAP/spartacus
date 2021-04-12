import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { FileValidity } from '../model/import-export.model';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ImportExportConfig {
  fileValidity: FileValidity;
  file: { separator: string };
}
