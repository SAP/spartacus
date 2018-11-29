import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  map,
  filter,
  catchError,
  mergeMap,
  switchMap,
  take
} from 'rxjs/operators';

import * as productActions from '../actions/product.action';
import { OccProductService } from '../../occ/product.service';
import { ProductImageConverterService } from '../converters/product-image-converter.service';
import { ProductReferenceConverterService } from '../converters/product-reference-converter.service';
// import { RoutingService } from '../../../routing/facade/routing.service';

import { RoutingService } from '../../../routing';
import { PageType } from '../../../occ-models/occ.models';

@Injectable()
export class ProductEffects {
  @Effect()
  loadProduct$: Observable<any> = this.actions$.pipe(
    ofType(productActions.LOAD_PRODUCT),
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

  @Effect()
  refreshProduct$ = this.actions$.pipe(
    ofType('[Site-context] Language Change', '[Site-context] Currency Change'),
    switchMap(() =>
      this.routingService.routerState$.pipe(
        filter(routerState => routerState !== undefined),
        map(routerState => routerState.state.context),
        take(1),
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
      )
    )
  );

  constructor(
    private actions$: Actions,
    private occProductService: OccProductService,
    private productImageConverter: ProductImageConverterService,
    private productReferenceConverterService: ProductReferenceConverterService,
    private routingService: RoutingService
  ) {}
}
