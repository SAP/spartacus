import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  ActiveCartService,
  Cart,
  OrderEntry,
  RoutingService,
  TranslationService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { ExportCsvFileService } from '@spartacus/storefront';
import {
  ImportExportConfig,
  ExportColumn,
  ExportConfig,
  ExportCartRoutes,
} from '@spartacus/cart/import-export/core';
import { SavedCartDetailsService } from '@spartacus/cart/saved-cart/components';

@Injectable({
  providedIn: 'root',
})
export class ExportEntriesService {
  constructor(
    protected routingService: RoutingService,
    protected activeCartService: ActiveCartService,
    protected savedCartDetailsService: SavedCartDetailsService,
    protected importExportConfig: ImportExportConfig,
    protected translationService: TranslationService,
    protected globalMessageService: GlobalMessageService,
    protected exportCsvFileService: ExportCsvFileService
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

  protected get placement$(): Observable<string | undefined> {
    return this.routingService
      .getRouterState()
      .pipe(map((route) => route.state?.semanticRoute));
  }

  protected getEntries(): Observable<OrderEntry[]> {
    return this.placement$.pipe(
      switchMap((placement) => {
        switch (placement) {
          case ExportCartRoutes.SAVED_CART_DETAILS: {
            return this.getSavedCartEntries();
          }
          case ExportCartRoutes.CART: {
            return this.getActiveCartEntries();
          }
          default: {
            return this.getActiveCartEntries();
          }
        }
      }),
      filter((entries) => entries?.length > 0)
    );
  }

  protected getSavedCartEntries(): Observable<OrderEntry[]> {
    return this.savedCartDetailsService
      .getCartDetails()
      .pipe(
        map((cart: Cart | undefined) => cart?.entries ?? ([] as OrderEntry[]))
      );
  }

  protected getActiveCartEntries(): Observable<OrderEntry[]> {
    return this.activeCartService.getEntries();
  }

  protected getResolvedValues(): Observable<string[][]> {
    return this.getEntries().pipe(
      map((entries) =>
        entries.map((entry) =>
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

  getResolvedEntries(): Observable<string[][]> {
    return this.getResolvedValues().pipe(
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
