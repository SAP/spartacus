import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

import * as productActions from '../actions/product.action';
import { OccProductService } from '../../../occ/product/product.service';
import { ProductImageConverterService } from '../../converters/product-image-converter.service';
import { ProductReferenceConverterService } from '../../converters/product-reference-converter.service';

import { PageType } from '../../../routing/models/page-context.model';

@Injectable()
export class ProductEffects {
  @Effect()
  loadProduct$: Observable<any> = this.actions$
    .ofType(productActions.LOAD_PRODUCT)
    .pipe(
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

  /*@Effect()
  refreshProduct$ = this.actions$
    .ofType('[Site-context] Language Change', '[Site-context] Currency Change')
    .pipe(
      map((action: any) => action.payload),
      filter(pageContext => pageContext.type === PageType.PRODUCT_PAGE),
      mergeMap(pageContext => {
        return this.occProductService.loadProduct(pageContext.id).pipe(
          map(product => {
            this.productImageConverter.convertProduct(product);
            this.productReferenceConverterService.convertProduct(product);
            return new productActions.LoadProductSuccess(product);
          }),
          catchError(error => of(new productActions.LoadProductFail(error)))
        );
      })
    );*/

  constructor(
    private actions$: Actions,
    private occProductService: OccProductService,
    private productImageConverter: ProductImageConverterService,
    private productReferenceConverterService: ProductReferenceConverterService
  ) {}
}
