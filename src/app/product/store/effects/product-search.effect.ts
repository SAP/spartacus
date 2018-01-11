import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import * as productSearchActions from '../actions/product-search.action';
import { OccProductSearchService } from '../../../newocc/product/product-search.service';
import { ProductImageConverterService } from '../../converters/product-image-converter.service';

@Injectable()
export class ProductSearchEffects {
  @Effect()
  searchProducts$ = this.actions$
    .ofType(productSearchActions.SEARCH_PRODUCTS)
    .pipe(
      map((action: productSearchActions.SearchProducts) => action.payload),
      switchMap(payload => {
        return this.occProductSearchService
          .query(payload.queryText, payload.searchConfig.pageSize)
          .pipe(
            map(data => {
              this.productImageConverter.convertList(data.products);
              return new productSearchActions.SearchProductsSuccess(data);
            }),
            catchError(error =>
              of(new productSearchActions.SearchProductsFail(error))
            )
          );
      })
    );

  @Effect()
  getProductSuggestions$ = this.actions$
    .ofType(productSearchActions.GET_PRODUCT_SUGGESTIONS)
    .pipe(
      map(
        (action: productSearchActions.GetProductSuggestions) => action.payload
      ),
      switchMap(payload => {
        return this.occProductSearchService
          .queryProductSuggestions(payload.term, payload.searchConfig.pageSize)
          .pipe(
            map(data => {
              return new productSearchActions.GetProductSuggestionsSuccess(
                data.suggestions
              );
            }),
            catchError(error =>
              of(new productSearchActions.GetProductSuggestionsFail(error))
            )
          );
      })
    );

  constructor(
    private actions$: Actions,
    private occProductSearchService: OccProductSearchService,
    private productImageConverter: ProductImageConverterService
  ) {}
}
