import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { ExportColumn } from '../model/export-entries.model';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ImportExportConfig {
  importExport?: {
    file: { separator: string };
    export?: {
      additionalColumns?: ExportColumn[];
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends ImportExportConfig {}
}
