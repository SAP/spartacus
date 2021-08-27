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
import { filter, map, switchMap, first, withLatestFrom } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { SavedCartDetailsService } from '@spartacus/cart/saved-cart/components';
import {
  ImportExportConfig,
  ExportColumn,
  ExportCsvService,
  ExportConfig,
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
    protected exportCsvService: ExportCsvService
  ) {}

  // private get exportConfig(): ExportConfig {
  //   return {
  //     additionalColumns:
  //       this.importExportConfig.cartImportExport?.export?.additionalColumns ??
  //       [],
  //     messageEnabled:
  //       this.importExportConfig.cartImportExport?.export?.messageEnabled ??
  //       true,
  //     messageTimeout:
  //       this.importExportConfig.cartImportExport?.export?.messageTimeout ??
  //       6000,
  //     downloadDelay:
  //       this.importExportConfig.cartImportExport?.export?.downloadDelay ?? 1000,
  //     fileName: 'cart',
  //   };
  // }

  private columns: ExportColumn[] = [
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
    ...this.exportConfig.additionalColumns,
  ];

  protected resolveValue(combinedKeys: string, entry: OrderEntry): string {
    return (
      combinedKeys
        .split('.')
        .reduce((obj, key) => (obj as any)[key], entry)
        ?.toString() ?? ''
    );
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
    this.translationService
      .translate('exportEntries.exportMessage')
      .pipe(first())
      .subscribe((message) =>
        this.globalMessageService.add(
          message,
          GlobalMessageType.MSG_TYPE_INFO,
          this.messageTimeout
        )
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
    if (this.messageEnabled) this.displayExportMessage();

    this.exportCsvService.downloadCsv(
      this.exportCsvService.dataToCsv(entries),
      this.fileName,
      undefined,
      this.downloadDelay
    );
  }
}
