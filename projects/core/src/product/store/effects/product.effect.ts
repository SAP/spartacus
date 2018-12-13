import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  map,
  catchError,
  mergeMap,
  switchMap,
  groupBy,
  filter
} from 'rxjs/operators';

import * as actions from '../actions/index';
import * as converters from '../converters/index';

import { OccProductService } from '../../occ/product.service';
import { PRODUCT_DETAIL_ENTITY } from '../actions/index';

export function ofEntityLoad(type: string) {
  return filter((action: any) =>
    action.meta &&
    action.meta.entity &&
    action.meta.entity.type === PRODUCT_DETAIL_ENTITY &&
    action.meta.entity.load);
}

@Injectable()
export class ProductEffects {
  @Effect()
  loadProduct$ = this.actions$.pipe(
    // ofType(actions.LOAD_PRODUCT),
    ofEntityLoad(PRODUCT_DETAIL_ENTITY),
    map((action: actions.LoadProduct) => action.meta.entity.id),
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
