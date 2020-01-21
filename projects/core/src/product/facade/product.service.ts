import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { map, observeOn, shareReplay, tap } from 'rxjs/operators';
import { Product } from '../../model/product.model';
import { ProductActions } from '../store/actions/index';
import { StateWithProduct } from '../store/product-state';
import { ProductSelectors } from '../store/selectors/index';
import { ProductLoadingService } from '../services/product-loading.service';
import { ProductScope } from '../model/product-scope';

@Injectable()
export class ProductService {
  constructor(
    store: Store<StateWithProduct>,
    // tslint:disable-next-line:unified-signatures
    productLoading: ProductLoadingService
  );
  /**
   * @deprecated since 1.4
   */
  constructor(store: Store<StateWithProduct>);

  constructor(
    protected store: Store<StateWithProduct>,
    protected productLoading?: ProductLoadingService
  ) {}

  /** @deprecated since 1.4 */
  private products: { [code: string]: Observable<Product> } = {};

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
    scopes: (ProductScope | string)[] | ProductScope | string = ''
  ): Observable<Product> {
    // TODO: Remove, deprecated since 1.4
    if (!this.productLoading) {
      if (!this.products[productCode]) {
        this.products[productCode] = this.store.pipe(
          select(ProductSelectors.getSelectedProductStateFactory(productCode)),
          observeOn(queueScheduler),
          tap(productState => {
            const attemptedLoad =
              productState.loading ||
              productState.success ||
              productState.error;

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
    // END OF (TODO: Remove, deprecated since 1.4)

    return this.productLoading.get(productCode, [].concat(scopes));
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

  /**
   * Reloads the product. The product is loaded implicetly
   * whenever selected by the `get`, but in some cases an
   * explicit reload might be needed.
   */
  reload(productCode: string, scope: ProductScope | string = ''): void {
    this.store.dispatch(new ProductActions.LoadProduct(productCode, scope));
  }
}
