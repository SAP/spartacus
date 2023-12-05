import { OrderEntry } from '@spartacus/cart/base/root';
import { ExportColumn, ExportConfig, ImportExportConfig } from '@spartacus/cart/import-export/core';
import { GlobalMessageService, TranslationService } from '@spartacus/core';
import { ExportCsvFileService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ExportOrderEntriesToCsvService {
    protected exportCsvFileService: ExportCsvFileService;
    protected importExportConfig: ImportExportConfig;
    protected globalMessageService: GlobalMessageService;
    protected translationService: TranslationService;
    constructor(exportCsvFileService: ExportCsvFileService, importExportConfig: ImportExportConfig, globalMessageService: GlobalMessageService, translationService: TranslationService);
    protected get exportConfig(): ExportConfig | undefined;
    protected get separator(): string | undefined;
    protected columns: ExportColumn[];
    downloadCsv(entries: OrderEntry[]): void;
    protected resolveValue(combinedKeys: string, entry: OrderEntry): string;
    protected resolveValues(entries: OrderEntry[]): string[][];
    protected getTranslatedColumnHeaders(): Observable<string[]>;
    protected displayExportMessage(): void;
    protected limitValues(data: string[][]): string[][];
    protected getResolvedEntries(entries: OrderEntry[]): Observable<string[][]>;
    protected download(entries: string[][]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExportOrderEntriesToCsvService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ExportOrderEntriesToCsvService>;
}
