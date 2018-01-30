import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, catchError, mergeMap } from 'rxjs/operators';

import * as productActions from '../actions/product.action';
import { OccProductService } from '../../../newocc/product/product.service';
import { ProductImageConverterService } from '../../converters/product-image-converter.service';
import { ProductReferenceConverterService } from '../../converters/product-reference-converter.service';

@Injectable()
export class ProductEffects {
  @Effect()
  loadProduct$ = this.actions$.ofType(productActions.LOAD_PRODUCT).pipe(
    map((action: productActions.LoadProduct) => action.payload),
    mergeMap(productCode => {
      return this.occProductService.loadProduct(productCode).pipe(
        map(product => {
          this.productImageConverter.convertProduct(product);
          this.productReferenceConverterService.convertProduct(product);
          return new productActions.LoadProductSuccess(product);
        }),
        catchError(error => of(new productActions.LoadProductFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private occProductService: OccProductService,
    private productImageConverter: ProductImageConverterService,
    private productReferenceConverterService: ProductReferenceConverterService
  ) {}
}
