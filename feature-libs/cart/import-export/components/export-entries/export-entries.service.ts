import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  Cart,
  OrderEntry,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { SavedCartDetailsService } from '@spartacus/cart/saved-cart/components';
import { Observable } from 'rxjs';
import { ImportExportConfig } from '@spartacus/cart/import-export/core';
import { ExportColumn } from '../../core/model/export-entries.model';

@Injectable({
  providedIn: 'root',
})
export class ExportEntriesService {
  constructor(
    protected routingService: RoutingService,
    protected activeCartService: ActiveCartService,
    protected savedCartDetailsService: SavedCartDetailsService,
    protected importExportConfig: ImportExportConfig,
    protected translationService: TranslationService
  ) {}

  private get additionalColumns() {
    return this.importExportConfig.importExport.export.additionalColumns;
  }

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
    ...this.additionalColumns,
  ];

  getEntries(): Observable<OrderEntry[]> {
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

  exportEntries() {
    const names: any = [];
    const values: any = [];

    this.columns.map((column) => {
      this.translationService
        .translate(`exportEntries.columnNames.${column.name.key}`)
        .pipe(take(1))
        .subscribe((name) => names.push(name));
    });

    this.getEntries()
      .pipe(take(1))
      .subscribe((entries) => {
        entries.map((entry) => {
          console.log(entry);
          values.push(
            Object.assign(
              {},
              this.columns.map((column) =>
                this.resolveValue(column.value, entry)
              )
            )
          );
        });
      });

    return [{ ...names }, ...values];
  }
}
