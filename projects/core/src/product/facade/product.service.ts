import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Product } from '../../model/product.model';
import { DEFAULT_SCOPE } from '../../occ/occ-models/occ-endpoints.model';
import { ProductScope } from '../model/product-scope';
import { ProductLoadingService } from '../services/product-loading.service';
import { StateWithProduct } from '../store/product-state';
import { ProductSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    protected store: Store<StateWithProduct>,
    protected productLoading: ProductLoadingService
  ) {}

  /**
   * Returns the product observable. The product will be loaded
   * whenever there's no value observed.
   *
   * The underlying product loader ensures that the product is
   * only loaded once, even in case of parallel observers.
   *
   * You should provide product data scope you are interested in to not load all
   * the data if not needed. You can provide more than one scope.
   *
   * @param productCode Product code to load
   * @param scopes Scope or scopes of the product data
   */
  get(
    productCode: string,
    scopes: (ProductScope | string)[] | ProductScope | string = DEFAULT_SCOPE
  ): Observable<Product> {
    return productCode
      ? this.productLoading.get(productCode, [].concat(scopes))
      : of(undefined);
  }

  /**
   * Returns boolean observable for product's loading state
   */
  isLoading(
    productCode: string,
    scope: ProductScope | string = ''
  ): Observable<boolean> {
    return this.store.pipe(
      select(
        ProductSelectors.getSelectedProductLoadingFactory(productCode, scope)
      )
    );
  }

  /**
   * Returns boolean observable for product's load success state
   */
  isSuccess(
    productCode: string,
    scope: ProductScope | string = ''
  ): Observable<boolean> {
    return this.store.pipe(
      select(
        ProductSelectors.getSelectedProductSuccessFactory(productCode, scope)
      )
    );
  }

  /**
   * Returns boolean observable for product's load error state
   */
  hasError(
    productCode: string,
    scope: ProductScope | string = ''
  ): Observable<boolean> {
    return this.store.pipe(
      select(
        ProductSelectors.getSelectedProductErrorFactory(productCode, scope)
      )
    );
  }
}
