import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Product } from '../../model/product.model';
import { ProductActions } from '../store/actions/index';
import { StateWithProduct } from '../store/product-state';
import { ProductSelectors } from '../store/selectors/index';

@Injectable()
export class ProductService {
  constructor(protected store: Store<StateWithProduct>) {}

  private products: { [code: string]: Observable<Product> } = {};

  /**
   * Returns the product observable. The product will be loaded
   * whenever there's no value observed.
   *
   * The underlying product loader ensures that the product is
   * only loaded once, even in case of parallel observers.
   */
  get(productCode: string): Observable<Product> {
    if (!this.products[productCode]) {
      this.products[productCode] = this.store.pipe(
        select(ProductSelectors.getSelectedProductStateFactory(productCode)),
        tap(productState => {
          const attemptedLoad =
            productState.loading || productState.success || productState.error;

          if (!attemptedLoad) {
            this.store.dispatch(new ProductActions.LoadProduct(productCode));
          }
        }),
        map(productState => productState.value),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.products[productCode];
  }

  /**
   * Returns boolean observable for product's loading state
   */
  isLoading(productCode: string): Observable<boolean> {
    return this.store.pipe(
      select(ProductSelectors.getSelectedProductLoadingFactory(productCode))
    );
  }

  /**
   * Returns boolean observable for product's load success state
   */
  isSuccess(productCode: string): Observable<boolean> {
    return this.store.pipe(
      select(ProductSelectors.getSelectedProductSuccessFactory(productCode))
    );
  }

  /**
   * Returns boolean observable for product's load error state
   */
  hasError(productCode: string): Observable<boolean> {
    return this.store.pipe(
      select(ProductSelectors.getSelectedProductErrorFactory(productCode))
    );
  }

  /**
   * Reloads the product. The product is loaded implicetly
   * whenever selected by the `get`, but in some cases an
   * explicit reload might be needed.
   */
  reload(productCode: string): void {
    this.store.dispatch(new ProductActions.LoadProduct(productCode));
  }
}
