import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromStore from './store';
import * as fromRouting from '../routing/store';
import { tap, filter, map, take, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(): Observable<boolean> {
    let requestedProductCode;
    this.store
      .select(fromRouting.getRouterState)
      .subscribe(
        routerState =>
          (requestedProductCode = routerState.state.params['productCode'])
      );

    return this.checkStore(requestedProductCode).pipe(
      switchMap(() => of(true)),
      catchError(err => of(false))
    );
  }

  private checkStore(requestedProductCode: string): Observable<string[]> {
    return this.store.select(fromStore.getAllProductCodes).pipe(
      tap(codes => {
        const found = codes.indexOf(requestedProductCode) > -1;
        if (!found) {
          this.store.dispatch(new fromStore.LoadProduct(requestedProductCode));
          this.store.dispatch(
            new fromStore.LoadProductReviews(requestedProductCode)
          );
        }
      })
    );
  }
}
