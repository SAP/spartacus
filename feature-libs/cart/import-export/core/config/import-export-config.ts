import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { ExportConfig } from '../model/export-entries.model';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ImportExportConfig {
  cartImportExport?: {
    file: { separator: string };
    export?: ExportConfig;
  };
}

declare module '@spartacus/core' {
  interface Config extends ImportExportConfig {}
}
