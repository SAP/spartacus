import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  Cart,
  CmsService,
  OrderEntry,
} from '@spartacus/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { isArray } from 'rxjs/internal-compatibility';
import { SavedCartDetailsService } from '@spartacus/cart/saved-cart/components';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExportEntriesService {
  constructor(
    protected cmsService: CmsService,
    protected activeCartService: ActiveCartService,
    protected savedCartDetailsService: SavedCartDetailsService
  ) {}

  getEntries(): Observable<OrderEntry[]> {
    return this.cmsService.getCurrentPage().pipe(
      switchMap((page) => {
        switch (page.pageId) {
          case 'savedCartDetailsPage':
            return this.savedCartDetailsService
              .getCartDetails()
              .pipe(
                map(
                  (cart: Cart | undefined) =>
                    cart?.entries ?? ([] as OrderEntry[])
                )
              );
          case 'cartPage':
            return this.activeCartService.getEntries();
          default:
            return this.activeCartService.getEntries();
        }
      }),
      filter((entries) => isArray(entries) && entries.length > 0)
    );
  }
}
