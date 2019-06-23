import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, groupBy, map, mergeMap, switchMap } from 'rxjs/operators';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { ProductConnector } from '../../connectors/product/product.connector';
import * as actions from '../actions/index';

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
              of(
                new actions.LoadProductFail(
                  productCode,
                  makeErrorSerializable(error)
                )
              )
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
