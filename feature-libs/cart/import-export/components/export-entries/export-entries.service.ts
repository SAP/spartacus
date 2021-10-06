import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import {
  OrderEntry,
  TranslationService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { ExportCsvFileService } from '@spartacus/storefront';
import {
  ImportExportConfig,
  ExportColumn,
  ExportConfig,
  AbstractImportExportService,
} from '@spartacus/cart/import-export/core';

@Injectable({
  providedIn: 'root',
})
export class ExportEntriesService {
  constructor(
    protected exportCsvFileService: ExportCsvFileService,
    protected importExportConfig: ImportExportConfig,
    protected globalMessageService: GlobalMessageService,
    protected translationService: TranslationService
  ) {}

  protected get exportConfig(): ExportConfig | undefined {
    return this.importExportConfig.cartImportExport?.export;
  }

  protected get separator(): string | undefined {
    return this.importExportConfig.cartImportExport?.file.separator;
  }

  protected columns: ExportColumn[] = [
    {
      name: {
        key: 'code',
      },
      value: 'product.code',
    },
    {
      name: {
        key: 'quantity',
      },
      value: 'quantity',
    },
    ...(this.exportConfig?.additionalColumns ?? []),
  ];

  protected resolveValue(combinedKeys: string, entry: OrderEntry): string {
    const values: any = combinedKeys
      .split('.')
      .reduce((obj, key) => (obj ? (obj as any)[key] : ''), entry);

    return typeof values === 'object'
      ? JSON.stringify(values).replace(/"/g, `'`)
      : values?.toString() ?? '';
  }

  protected getResolvedValues(
    service: AbstractImportExportService
  ): Observable<string[][]> {
    return service
      .getEntries()
      .pipe(
        filter((entries) => entries?.length > 0),
        map((entries) =>
          entries?.map((entry) =>
            this.columns.map((column) => this.resolveValue(column.value, entry))
          )
        )
      );
  }

  protected getTranslatedColumnHeaders(): Observable<string[]> {
    return combineLatest(
      this.columns.map((column) =>
        this.translationService.translate(
          `exportEntries.columnNames.${column.name.key}`
        )
      )
    );
  }

  protected displayExportMessage(): void {
    this.globalMessageService.add(
      { key: 'exportEntries.exportMessage' },
      GlobalMessageType.MSG_TYPE_INFO
    );
  }

  protected limitValues(data: string[][]): string[][] {
    return this.exportConfig?.maxEntries
      ? data.splice(0, this.exportConfig?.maxEntries)
      : data;
  }

  getResolvedEntries(
    service: AbstractImportExportService
  ): Observable<string[][]> {
    return this.getResolvedValues(service).pipe(
      map((values) => this.limitValues(values)),
      withLatestFrom(this.getTranslatedColumnHeaders()),
      map(([values, headers]) => {
        return [headers, ...values];
      })
    );
  }

  downloadCsv(entries: string[][]): void {
    if (this.exportConfig?.messageEnabled) {
      this.displayExportMessage();
    }
    setTimeout(() => {
      if (this.exportConfig !== undefined && this.separator !== undefined) {
        this.exportCsvFileService.download(
          entries,
          this.separator,
          this.exportConfig.fileOptions
        );
      }
    }, this.exportConfig?.downloadDelay ?? 0);
  }
}
