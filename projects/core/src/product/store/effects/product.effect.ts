import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import { StateWithProduct } from '../product-state';
import * as actions from '../actions/index';
import * as selectors from '../selectors/index';
import * as convertors from '../converters/index';

import { OccProductService } from '../../occ/product.service';

@Injectable()
export class ProductEffects {
  @Effect()
  loadProduct$: Observable<any> = this.actions$.pipe(
    ofType(actions.LOAD_PRODUCT),
    mergeMap((action: actions.LoadProduct) => {
      return this.store.pipe(
        select(selectors.getSelectedProductStateFactory(action.payload)),
        switchMap(state => {
          if (!state.loading && (!state.value || action.meta.reload)) {
            return of(new actions.LoadProductStart(action.payload));
          } else {
            return EMPTY;
          }
        })
      );
    })
  );

  @Effect()
  loadProductStart$ = this.actions$.pipe(
    ofType(actions.LOAD_PRODUCT_START),
    map((action: actions.LoadProduct) => action.payload),
    mergeMap(productCode => {
      return this.occProductService.loadProduct(productCode).pipe(
        map(product => {
          this.productImageConverter.convertProduct(product);
          this.productReferenceConverterService.convertProduct(product);
          return new actions.LoadProductSuccess(product);
        }),
        catchError(error => of(new actions.LoadProductFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<StateWithProduct>,
    private occProductService: OccProductService,
    private productImageConverter: convertors.ProductImageConverterService,
    private productReferenceConverterService: convertors.ProductReferenceConverterService
  ) {}
}
