import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, queueScheduler } from 'rxjs';
import { map, observeOn, shareReplay, tap } from 'rxjs/operators';
import { Product } from '../../model/product.model';
import { ProductActions } from '../store/actions/index';
import { StateWithProduct } from '../store/product-state';
import { ProductSelectors } from '../store/selectors/index';
import { OccConfig } from '../../occ/config/occ-config';

@Injectable()
export class ProductService {
  constructor(
    protected store: Store<StateWithProduct>,
    protected config?: OccConfig
  ) {}

  private products: {
    [code: string]: { [scope: string]: Observable<Product> };
  } = {};

  /**
   * Aims to expand scopes based on entityScopes config.
   *
   * I.e. if 'details' scope includes 'list' scope by configuration, you'll get ['details', 'list']
   *
   * @param scopes
   */
  private expandScopes(scopes: string | string[]): string[] {
    scopes = [].concat(scopes);
    const includedScopes = [];

    const scopesConfig =
      this.config &&
      this.config.backend &&
      this.config.backend.entityScopes &&
      this.config.backend.entityScopes.product;

    if (scopesConfig) {
      scopes.forEach(scope => {
        if (scopesConfig[scope] && scopesConfig[scope].include) {
          includedScopes.push(...scopesConfig[scope].include);
        }
      });

      return Array.from(new Set([...scopes, ...includedScopes]));
    }

    return scopes;
  }

  /**
   * Returns the product observable. The product will be loaded
   * whenever there's no value observed.
   *
   * The underlying product loader ensures that the product is
   * only loaded once, even in case of parallel observers.
   */
  get(
    productCode: string,
    scopes: string[] | string = ''
  ): Observable<Product> {
    scopes = this.expandScopes(scopes);

    this.initProductScopes(productCode, scopes);

    if (scopes.length > 1) {
      return combineLatest(
        scopes.map(scope => this.products[productCode][scope])
      ).pipe(map(productPart => Object.assign({}, ...productPart)));
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
