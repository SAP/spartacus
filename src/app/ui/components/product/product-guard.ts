import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import * as fromStore from './../../../product/store';
import * as fromSelectors from './../../../product/store/selectors/product.selectors';

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const productCode = route.params['productCode'];

    {
      const xxx = [
        { productCode: '1', x: 1 },
        { productCode: '2', x: 2 },
        { productCode: '3', x: 3 },
        { productCode: '4', x: 4 },
        { productCode: '5', x: 5 }
      ];
      Observable.of(xxx)
        .filter(products => {
          console.log('FILTER');

          if (products && Array.isArray(products)) {
            let found;
            for (const element of products) {
              if (element.productCode === '4') {
                found = element;
                break;
              }
            }

            if (found) {
              console.log('FOUND');
              return true;
            }
            return false;
            // return found !== undefined;
          } else {
            return false;
          }
        })
        .subscribe((x: any) => {
          console.log('SUBSCRIBE');

          if (Array.isArray(x)) {
            console.log('ARRAY:');
            x.forEach(element => console.log(element));
          } else {
            console.log(`ONE: ${x.productCode}`);
          }
        });
    }

    this.store
      .select(fromSelectors.getAllProductCodes)
      .filter(products => {
        if (products && Array.isArray(products)) {
        }

        return false;
      })
      .subscribe(product => {
        console.log(`PRODUCT: ${product}`);
      });

    return true;
  }
}
