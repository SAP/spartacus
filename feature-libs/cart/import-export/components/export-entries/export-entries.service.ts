import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import {
  ActiveCartService,
  Cart,
  OrderEntry,
  TranslationService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { ExportCsvFileService } from '@spartacus/storefront';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import {
  ImportExportConfig,
  ExportColumn,
  ExportConfig,
  CartTypes,
} from '@spartacus/cart/import-export/core';
import { SavedCartDetailsService } from '@spartacus/cart/saved-cart/components';

@Injectable({
  providedIn: 'root',
})
export class ExportEntriesService {
  constructor(
    protected activeCartService: ActiveCartService,
    protected savedCartDetailsService: SavedCartDetailsService,
    protected importExportConfig: ImportExportConfig,
    protected translationService: TranslationService,
    protected globalMessageService: GlobalMessageService,
    protected exportCsvFileService: ExportCsvFileService,
    protected quickOrderFacade: QuickOrderFacade
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

  protected getEntries(cartType: CartTypes): Observable<OrderEntry[]> {
    switch (cartType) {
      case CartTypes.QUICK_ORDER: {
        return this.getQuickOrderEntries();
      }
      case CartTypes.SAVED_CART: {
        return this.getSavedCartEntries();
      }
      case CartTypes.ACTIVE_CART:
      default: {
        return this.getActiveCartEntries();
      }
    }
  }

  protected getQuickOrderEntries(): Observable<OrderEntry[]> {
    return this.quickOrderFacade.getEntries();
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

  protected getResolvedValues(cartType: CartTypes): Observable<string[][]> {
    return this.getEntries(cartType).pipe(
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

  getResolvedEntries(cartType: CartTypes): Observable<string[][]> {
    return this.getResolvedValues(cartType).pipe(
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
