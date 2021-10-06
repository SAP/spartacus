import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActiveCartService, OrderEntry } from '@spartacus/core';
import { ProductsData } from '../model/import-to-cart.model';
import { CartTypes } from '../model/import-export.model';
import { ImportExportContext } from './import-export.context';
import { CartImportExportContext } from './cart-import-export.context';

@Injectable({
  providedIn: 'root',
})
export class ActiveCartImportExportContext
  extends CartImportExportContext
  implements ImportExportContext
{
  constructor(
    protected actionsSubject: ActionsSubject,
    protected activeCartService: ActiveCartService
  ) {
    super(actionsSubject);
  }
  type: CartTypes.ACTIVE_CART;

  getEntries(): Observable<OrderEntry[]> {
    return this.activeCartService.getEntries();
  }

  protected _addEntries(products: ProductsData): Observable<string> {
    this.activeCartService.addEntries(this.mapProductsToOrderEntries(products));
    return this.activeCartService.getActiveCartId();
  }

  protected mapProductsToOrderEntries(products: ProductsData): OrderEntry[] {
    return products.map(
      (product: { productCode: string; quantity: number }) => ({
        product: { code: product.productCode },
        quantity: product.quantity,
      })
    );
  }
}
