import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { ActiveCartService, OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CartImportContext } from '../order-entries-context/cart-import.context';
import { ExportContext } from '../order-entries-context/export.context';
import { CartTypes } from '../order-entries-context/import-export.model';
import { ProductData } from '../order-entries-context/import-to-cart.model';
import { ImportContext } from '../order-entries-context/import.context';

@Injectable({
  providedIn: 'root',
})
export class ActiveCartImportExportContext
  extends CartImportContext
  implements ImportContext, ExportContext {
  readonly type = CartTypes.ACTIVE_CART;

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
