import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { ExportColumn } from '../model/export-entries.model';
import { FileValidity } from '../model/import-to-cart.model';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ImportExportConfig {
  importExport: {
    fileValidity?: FileValidity;
    file: { separator: string };
    export?: {
      additionalColumns?: ExportColumn[];
    };
  };
}
