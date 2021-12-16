import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
  GlobalMessageService,
  GlobalMessageType,
  OrderEntry,
  TranslationService,
} from '@spartacus/core';
import { ExportCsvFileService } from '@spartacus/storefront';
import {
  ExportColumn,
  ExportConfig,
  ImportExportConfig,
} from '@spartacus/cart/import-export/core';

@Injectable({
  providedIn: 'root',
})
export class ExportOrderEntriesToCsvService {
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

  downloadCsv(entries: OrderEntry[]): void {
    this.getResolvedEntries(entries)
      .pipe(take(1))
      .subscribe((csvData: string[][]) => this.download(csvData));
  }

  protected resolveValue(combinedKeys: string, entry: OrderEntry): string {
    return (
      combinedKeys
        .split('.')
        .reduce((obj, key) => (obj ? (obj as any)[key] : ''), entry)
        ?.toString() ?? ''
    );
  }

  protected resolveValues(entries: OrderEntry[]): string[][] {
    return entries.map((entry) =>
      this.columns.map((column) => this.resolveValue(column.value, entry))
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

  protected getResolvedEntries(entries: OrderEntry[]): Observable<string[][]> {
    const values = this.limitValues(this.resolveValues(entries));
    return this.getTranslatedColumnHeaders().pipe(
      map((headers) => {
        return [headers, ...values];
      })
    );
  }

  protected download(entries: string[][]): void {
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
