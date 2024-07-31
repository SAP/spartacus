/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../model';
import { DEFAULT_SCOPE } from '../../occ';
import { ProductSearchScope } from '../model/product-search-scope';
import { ProductSearchLoadingService } from '../services/product-search-loading.service';

@Injectable({
  providedIn: 'root',
})
export class ProductSearchByCodeService {
  protected productSearchLoadingService = inject(ProductSearchLoadingService);

  /**
   * Returns the product observable using Search. The product will be loaded
   * whenever there's no value observed.
   *
   * The underlying product loader ensures that the product is
   * only loaded once, even in case of parallel observers.
   *
   * You should provide product data scope you are interested in to not load all
   * the data if not needed. You can provide more than one scope.
   *
   * @param code Product code to load
   * @param scopes Scope or scopes of the product data
   */
  get({
    code,
    scopes,
  }: {
    code: string;
    scopes?: (ProductSearchScope | string)[] | ProductSearchScope | string;
  }): Observable<Product | undefined> {
    scopes ??= DEFAULT_SCOPE;
    return code
      ? this.productSearchLoadingService.get(
          code,
          ([] as string[]).concat(scopes)
        )
      : of(undefined);
  }
}
