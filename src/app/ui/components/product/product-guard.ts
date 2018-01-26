import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import * as fromActions from './../../../product/store/actions';
import * as fromStore from './../../../product/store';
import * as fromSelectors from './../../../product/store/selectors/product.selectors';

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requestedProductCode = route.params['productCode'];

    this.store
      .select(fromSelectors.getAllProductCodes)
      .map(productCodes =>
        this.findProductCode(productCodes, requestedProductCode)
      )
      .subscribe(productCode => {
        if (!productCode) {
          this.store.dispatch(
            new fromActions.LoadProduct(requestedProductCode)
          );
        }
      });

    return true;
  }

  private findProductCode(
    productCodes: Array<string>,
    productCode: string
  ): string {
    const filteredProductCodes = productCodes.filter(currentProductCode => {
      return currentProductCode === productCode;
    });

    if (filteredProductCodes.length > 0) {
      return filteredProductCodes[0];
    }

    return undefined;
  }
}
