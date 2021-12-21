import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { ActiveCartService, OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CartOrderEntriesContext } from '../order-entries-context/cart-order-entries.context';
import { OrderEntriesSource } from '../order-entries-context/import-export.model';
import { ProductData } from '../order-entries-context/import-to-cart.model';
import { AddOrderEntriesContext } from '../order-entries-context/add-order-entries.context';
import { GetOrderEntriesContext } from '../order-entries-context/get-order-entries.context';

@Injectable({
  providedIn: 'root',
})
export class ActiveCartOrderEntriesContext
  extends CartOrderEntriesContext
  implements AddOrderEntriesContext, GetOrderEntriesContext
{
  readonly type = OrderEntriesSource.ACTIVE_CART;

  constructor(
    protected actionsSubject: ActionsSubject,
    protected activeCartService: ActiveCartService
  ) {
    super(actionsSubject);
  }

  getEntries(): Observable<OrderEntry[]> {
    return this.activeCartService.getEntries();
  }

  protected add(products: ProductData[]): Observable<string> {
    this.activeCartService.addEntries(this.mapProductsToOrderEntries(products));
    return this.activeCartService.getActiveCartId();
  }

  protected mapProductsToOrderEntries(products: ProductData[]): OrderEntry[] {
    return products.map(
      (product: { productCode: string; quantity: number }) => ({
        product: { code: product.productCode },
        quantity: product.quantity,
      })
    );
  }
}
