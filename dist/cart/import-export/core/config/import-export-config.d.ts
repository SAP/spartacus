import { ExportConfig } from '../model/export-entries.model';
import { ImportConfig } from '../model/import-entries.config';
import * as i0 from "@angular/core";
export declare abstract class ImportExportConfig {
    cartImportExport?: {
        file: {
            separator: string;
        };
        import?: ImportConfig;
        export: ExportConfig;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<ImportExportConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ImportExportConfig>;
}
declare module '@spartacus/core' {
    interface Config extends ImportExportConfig {
    }
}
