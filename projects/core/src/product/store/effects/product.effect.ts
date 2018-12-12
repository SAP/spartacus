import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap, switchMap, groupBy } from 'rxjs/operators';

import * as actions from '../actions/index';
import * as converters from '../converters/index';

import { OccProductService } from '../../occ/product.service';

@Injectable()
export class ProductEffects {
  @Effect()
  loadProduct$ = this.actions$.pipe(
    ofType(actions.LOAD_PRODUCT),
    map((action: actions.LoadProduct) => action.payload),
    groupBy(productCode => productCode),
    mergeMap(group =>
      group.pipe(
        switchMap(productCode => {
          return this.occProductService.loadProduct(productCode).pipe(
            map(product => {
              this.productImageConverter.convertProduct(product);
              this.productReferenceConverterService.convertProduct(product);
              return new actions.LoadProductSuccess(product);
            }),
            catchError(error => of(new actions.LoadProductFail(error)))
          );
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private occProductService: OccProductService,
    private productImageConverter: converters.ProductImageConverterService,
    private productReferenceConverterService: converters.ProductReferenceConverterService
  ) {}
}
