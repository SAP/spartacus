/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  CmsProductCarouselComponent as model,
  FeatureConfigService,
  Product,
  ProductScope,
  ProductService,
  ProductSearchService,
} from '@spartacus/core';
import {Observable, of, switchMap} from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-product-carousel',
  templateUrl: './product-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCarouselComponent {
  private featureConfigService: FeatureConfigService = inject(FeatureConfigService);

  protected readonly PRODUCT_SCOPE = [ProductScope.LIST, ProductScope.STOCK];

  protected readonly PRODUCT_SCOPE_ITEM = [ProductScope.LIST_ITEM];

  private componentData$: Observable<model> = this.componentData.data$.pipe(
    filter((data) => Boolean(data))
  );

  /**
   * returns an Observable string for the title.
   */
  title$: Observable<string | undefined> = this.componentData$.pipe(
    map((data) => data.title)
  );

  /**
   * Observable that holds an Array of Observables. This is done, so that
   * the component UI could consider to lazy load the UI components when they're
   * in the viewpoint.
   * If the inner component mapping exists (e.g. ProductAddToCartComponent), we aim to leverage the full scope;
   * otherwise, we prefer to minimize the scope for better performance.
   */
  items$: Observable<Observable<Product | undefined>[]> =
    this.componentData$.pipe(
      map((data) => {
        const componentMappingExist = !!data.composition?.inner?.length;
        const componentId = data.uid;
        const codes = data.productCodes?.trim().split(' ') ?? [];
        return { componentMappingExist, codes, componentId };
      }),
      switchMap(({ componentMappingExist, codes ,componentId}) => {
        const productScope = componentMappingExist
          ? [...this.PRODUCT_SCOPE]
          : [...this.PRODUCT_SCOPE_ITEM];
        if(this.featureConfigService.isEnabled('productCarouselUseBatchApi')) {
          console.log('Feature Flag True - will be removed later');
          return this.productSearchService.searchAndReturnResults(codes, componentId);
        } else {
          console.log('Feature Flag False - will be removed later');
          return of(codes.map((code) => this.productService.get(code, productScope)));
        }
      })
    );

  constructor(
    protected componentData: CmsComponentData<model>,
    protected productService: ProductService,
    protected productSearchService: ProductSearchService
  ) {}
}
