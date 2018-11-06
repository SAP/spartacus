import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { tap, filter, take, switchMap, catchError, map } from 'rxjs/operators';

import * as fromStore from './../store';
import { RoutingService } from './../../routing/facade/routing.service';

@Injectable()
export class ProductGuard implements CanActivate {
  productCode: string;

  constructor(
    private store: Store<fromStore.ProductsState>,
    private routingService: RoutingService
  ) {
    this.routingService.routerState$.subscribe(
      routerState =>
        (this.productCode = routerState.state.params['productCode'])
    );
  }

  canActivate(): Observable<boolean> {
    return this.checkStore(this.productCode).pipe(
      switchMap(found => of(found)),
      catchError(_err => of(false))
    );
  }

  private checkStore(requestedProductCode: string): Observable<boolean> {
    let tryTimes = 0;
    return this.store.pipe(
      select(fromStore.getSelectedProductFactory(requestedProductCode)),
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
          this.store.dispatch(new fromStore.LoadProduct(requestedProductCode));
        }
      }),
      filter(found => found || tryTimes === 3),
      take(1)
    );
  }
}
