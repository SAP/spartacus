import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { map, catchError, mergeMap, switchMap, groupBy } from 'rxjs/operators';

import * as actions from '../actions/index';
import { ProductConnector } from '../../connectors/product/product.connector';

@Injectable()
export class ProductEffects {
  @Effect()
  loadProduct$: Observable<
    actions.LoadProductSuccess | actions.LoadProductFail
  > = this.actions$.pipe(
    ofType(actions.LOAD_PRODUCT),
    map((action: actions.LoadProduct) => action.payload),
    groupBy(productCode => productCode),
    mergeMap(group =>
      group.pipe(
        switchMap(productCode => {
          return this.productConnector.get(productCode).pipe(
            map(product => {
              return new actions.LoadProductSuccess(product);
            }),
            catchError(error =>
              of(new actions.LoadProductFail(productCode, error))
            )
          );
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productConnector: ProductConnector
  ) {}
}
