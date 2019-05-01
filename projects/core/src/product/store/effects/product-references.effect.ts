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
    mergeMap(payload => {
      return this.productReferencesConnector
        .get(payload.productCode, payload.referenceType, payload.pageSize)
        .pipe(
          map(data => {
            console.log('data from effects', data);
            return new productReferencesActions.LoadProductReferencesSuccess({
              productCode: payload.productCode,
              list: data,
            });
          }),
          catchError(_error =>
            of(
              new productReferencesActions.LoadProductReferencesFail({
                message: payload.productCode,
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
