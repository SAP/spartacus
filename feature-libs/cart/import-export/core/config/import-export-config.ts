import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { FileValidity } from '@spartacus/cart/import-export/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ImportExportConfig {
  importExport: {
    fileValidity?: FileValidity;
    file: { separator: string };
  };
}
