import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  Cart,
  OrderEntry,
  RoutingService,
  TranslationService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { SavedCartDetailsService } from '@spartacus/cart/saved-cart/components';
import {
  ImportExportConfig,
  ExportColumn,
  ExportCsvService,
  ExportConfig,
  ExportService,
} from '@spartacus/cart/import-export/core';

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
    protected exportCsvService: ExportCsvService,
    protected exportService: ExportService
  ) {}

  protected get exportConfig(): ExportConfig | undefined {
    return this.importExportConfig.cartImportExport?.export;
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

  protected getEntries(): Observable<OrderEntry[]> {
    return this.routingService.getRouterState().pipe(
      switchMap((route) => {
        switch (route.state?.semanticRoute) {
          case 'savedCartsDetails':
            return this.savedCartDetailsService
              .getCartDetails()
              .pipe(
                map(
                  (cart: Cart | undefined) =>
                    cart?.entries ?? ([] as OrderEntry[])
                )
              );
          case 'cart':
            return this.activeCartService.getEntries();
          default:
            return this.activeCartService.getEntries();
        }
      }),
      filter((entries) => entries?.length > 0)
    );
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

  protected displayExportMessage() {
    this.globalMessageService.add(
      { key: 'exportEntries.exportMessage' },
      GlobalMessageType.MSG_TYPE_INFO
    );
  }

  getResolvedEntries(): Observable<string[][]> {
    return this.getResolvedValues().pipe(
      withLatestFrom(this.getTranslatedColumnHeaders()),
      map(([values, headers]) => {
        return [headers, ...values];
      })
    );
  }

  downloadCsv(entries: string[][]) {
    if (this.exportConfig?.messageEnabled) {
      this.displayExportMessage();
    }
    setTimeout(() => {
      this.exportService.download(
        this.exportCsvService.dataToCsv(entries),
        this.exportConfig.fileOptions
      );
    }, this.exportConfig.downloadDelay ?? 0);
  }
}
