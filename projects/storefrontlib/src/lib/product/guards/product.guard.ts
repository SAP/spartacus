import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from './../store';
import * as fromRouting from './../../routing/store';
import { tap, filter, take, switchMap, catchError, map } from 'rxjs/operators';

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
      switchMap(found => of(found)),
      catchError(err => of(false))
    );
  }

  private checkStore(requestedProductCode: string): Observable<boolean> {
    let tryTimes = 0;
    return this.store
      .select(fromStore.getSelectedProductFactory(requestedProductCode))
      .pipe(
        map(product => {
          if (product) {
            return Object.keys(product).length !== 0;
          } else {
            return false;
          }
        }),
        tap(found => {
          if (!found) {
            tryTimes++;
            this.store.dispatch(
              new fromStore.LoadProduct(requestedProductCode)
            );
          }
        }),
        filter(found => found || tryTimes === 3),
        take(1)
      );
  }
}
