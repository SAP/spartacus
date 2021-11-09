import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import {
  ActiveCartFacade,
  AddOrderEntriesContext,
  GetOrderEntriesContext,
  OrderEntriesSource,
  OrderEntry,
  ProductData,
} from '@spartacus/cart/main/root';
import { Observable } from 'rxjs';
import { CartOrderEntriesContext } from '../order-entries-context/cart-order-entries.context';

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
    protected ActiveCartFacade: ActiveCartFacade
  ) {
    super(actionsSubject);
  }

  getEntries(): Observable<OrderEntry[]> {
    return this.ActiveCartFacade.getEntries();
  }

  protected add(products: ProductData[]): Observable<string> {
    this.ActiveCartFacade.addEntries(this.mapProductsToOrderEntries(products));
    return this.ActiveCartFacade.getActiveCartId();
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
