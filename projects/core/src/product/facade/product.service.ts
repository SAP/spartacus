import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, queueScheduler } from 'rxjs';
import { auditTime, map, observeOn, shareReplay, tap } from 'rxjs/operators';
import { Product } from '../../model/product.model';
import { ProductActions } from '../store/actions/index';
import { StateWithProduct } from '../store/product-state';
import { ProductSelectors } from '../store/selectors/index';
import { LoadingScopesService } from '../../occ/services/loading-scopes.service';
import { deepMerge } from '../../config/utils/deep-merge';

@Injectable()
export class ProductService {
  constructor(
    store: Store<StateWithProduct>,
    // tslint:disable-next-line:unified-signatures
    loadingScopes: LoadingScopesService
  );
  /**
   * @deprecated since 1.4
   */
  constructor(store: Store<StateWithProduct>);

  constructor(
    protected store: Store<StateWithProduct>,
    protected loadingScopes?: LoadingScopesService
  ) {}

  private products: {
    [code: string]: { [scope: string]: Observable<Product> };
  } = {};

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
    scopes: string[] | string = ''
  ): Observable<Product> {
    scopes = [].concat(scopes);

    if (this.loadingScopes) {
      scopes = this.loadingScopes.expand('product', scopes);
    }

    this.initProductScopes(productCode, scopes);

    if (scopes.length > 1) {
      return combineLatest(
        scopes.map(scope => this.products[productCode][scope])
      ).pipe(
        auditTime(0),
        map(
          productParts =>
            productParts.find(Boolean) && deepMerge({}, ...productParts)
        )
      );
    } else {
      return this.products[productCode][scopes[0]];
    }
  }

  private initProductScopes(productCode: string, scopes: string[]): void {
    if (!this.products[productCode]) {
      this.products[productCode] = {};
    }

    for (const scope of scopes) {
      if (!this.products[productCode][scope]) {
        this.products[productCode][scope] = this.getProductForScope(
          productCode,
          scope
        );
      }
    }
  }

  /**
   * Creates observable for providing specified product data for the scope
   *
   * @param productCode
   * @param scope
   */
  private getProductForScope(
    productCode: string,
    scope: string
  ): Observable<Product> {
    return this.store.pipe(
      select(
        ProductSelectors.getSelectedProductStateFactory(productCode, scope)
      ),
      observeOn(queueScheduler),
      tap(productState => {
        const attemptedLoad =
          productState.loading || productState.success || productState.error;

        if (!attemptedLoad) {
          this.store.dispatch(
            new ProductActions.LoadProduct(productCode, scope)
          );
        }
      }),
      map(productState => productState.value),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  /**
   * Returns boolean observable for product's loading state
   */
  isLoading(productCode: string, scope = ''): Observable<boolean> {
    return this.store.pipe(
      select(
        ProductSelectors.getSelectedProductLoadingFactory(productCode, scope)
      )
    );
  }

  /**
   * Returns boolean observable for product's load success state
   */
  isSuccess(productCode: string, scope = ''): Observable<boolean> {
    return this.store.pipe(
      select(
        ProductSelectors.getSelectedProductSuccessFactory(productCode, scope)
      )
    );
  }

  /**
   * Returns boolean observable for product's load error state
   */
  hasError(productCode: string, scope = ''): Observable<boolean> {
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
  reload(productCode: string, scope = ''): void {
    this.store.dispatch(new ProductActions.LoadProduct(productCode, scope));
  }
}
