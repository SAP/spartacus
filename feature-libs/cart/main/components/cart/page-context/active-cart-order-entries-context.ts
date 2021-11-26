import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import {
  ActiveCartFacade,
  AddOrderEntriesContext,
  CartOrderEntriesContext,
  GetOrderEntriesContext,
  OrderEntriesSource,
  OrderEntry,
  ProductData,
} from '@spartacus/cart/main/root';
import { Observable } from 'rxjs';

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
    protected activeCartFacade: ActiveCartFacade
  ) {
    super(actionsSubject);
  }

  getEntries(): Observable<OrderEntry[]> {
    return this.activeCartFacade.getEntries();
  }

  protected add(products: ProductData[]): Observable<string> {
    this.activeCartFacade.addEntries(this.mapProductsToOrderEntries(products));
    return this.activeCartFacade.getActiveCartId();
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
