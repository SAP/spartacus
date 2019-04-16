import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ErrorModel } from '../../../occ/occ-models/occ.models';
import { ProductReferencesConnector } from '../../connectors/references/product-references.connector';
import * as productReferencesActions from './../actions/product-references.action';

@Injectable()
export class ProductReferencesEffects {
  @Effect()
  loadProductReferences$: Observable<
    | productReferencesActions.LoadProductReferencesSuccess
    | productReferencesActions.LoadProductReferencesFail
  > = this.actions$.pipe(
    ofType(productReferencesActions.LOAD_PRODUCT_REFERENCES),
    map(
      (action: productReferencesActions.LoadProductReferences) => action.payload
    ),
    mergeMap(productCode => {
      return this.productReferencesConnector.get(productCode).pipe(
        map(data => {
          return new productReferencesActions.LoadProductReferencesSuccess({
            productCode,
            list: data,
          });
        }),
        catchError(_error =>
          of(
            new productReferencesActions.LoadProductReferencesFail({
              message: productCode,
            } as ErrorModel)
          )
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private productReferencesConnector: ProductReferencesConnector
  ) {}
}
