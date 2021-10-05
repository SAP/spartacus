import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActiveCartService, OrderEntry } from '@spartacus/core';
import { ProductsData } from '@spartacus/cart/import-export/core';
import { AbstractImportExportCartService } from './abstract-import-export-cart.service';

@Injectable({
  providedIn: 'root',
})
export class ImportExportActiveCartService extends AbstractImportExportCartService {
  constructor(
    protected actionsSubject: ActionsSubject,
    protected activeCartService: ActiveCartService
  ) {
    super(actionsSubject);
  }

  getEntries(): Observable<OrderEntry[]> {
    return this.activeCartService.getEntries();
  }

  addEntries(products: ProductsData): Observable<string> {
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
