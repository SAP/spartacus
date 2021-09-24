import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { ImportConfig } from '../model/import-to-cart.model';
import { ExportConfig } from '../model/export-entries.model';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ImportExportConfig {
  cartImportExport?: {
    file: { separator: string };
    import?: ImportConfig;
    export?: ExportConfig;
  };
}

declare module '@spartacus/core' {
  interface Config extends ImportExportConfig {}
}
