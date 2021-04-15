import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  Cart,
  OrderEntry,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { SavedCartDetailsService } from '@spartacus/cart/saved-cart/components';
import { ExportOrderEntry } from '@spartacus/cart/import-export/core';

@Injectable({
  providedIn: 'root',
})
export class ExportEntriesService {
  constructor(
    protected routingService: RoutingService,
    protected activeCartService: ActiveCartService,
    protected savedCartDetailsService: SavedCartDetailsService,
    protected translationService: TranslationService
  ) {}

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

  getColumnHeaders(): Observable<ExportOrderEntry> {
    return combineLatest([
      this.translationService.translate('exportEntries.columnHeaders.sku'),
      this.translationService.translate('exportEntries.columnHeaders.quantity'),
      this.translationService.translate('exportEntries.columnHeaders.name'),
      this.translationService.translate('exportEntries.columnHeaders.price'),
    ]).pipe(
      map(([sku, quantity, name, price]) => {
        return {
          sku,
          quantity,
          name,
          price,
        };
      })
    );
  }

  parseEntries(
    entries: OrderEntry[],
    columnHeaders?: ExportOrderEntry
  ): ExportOrderEntry[] {
    const exportEntries: ExportOrderEntry[] = [];

    if (columnHeaders) exportEntries.push(columnHeaders);
    entries.forEach((element: OrderEntry) => {
      exportEntries.push({
        sku: element?.product?.code || '',
        quantity: element?.quantity || '',
        name: element?.product?.name || '',
        price: element?.totalPrice?.formattedValue || '',
      });
    });

    return exportEntries;
  }
}
