/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  TrackByFunction,
} from '@angular/core';
import {
  FeatureDirective,
  CmsProductCarouselComponent as model,
  Product,
  ProductScope,
  ProductSearchByCategoryService,
  ProductSearchByCodeService,
  ProductService,
  TranslatePipe,
  useFeatureStyles,
} from '@spartacus/core';
import { Observable, of, switchMap, zip } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { CarouselScrollingComponent } from '../../../../shared/components/carousel-scrolling/carousel-scrolling.component';
import { CarouselComponent } from '../../../../shared/components/carousel/carousel.component';
import { ProductCarouselItemComponent } from '../product-carousel-item/product-carousel-item.component';

@Component({
  selector: 'cx-product-carousel',
  templateUrl: './product-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FeatureDirective,
    NgIf,
    CarouselScrollingComponent,
    CarouselComponent,
    ProductCarouselItemComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class ProductCarouselComponent {
  protected productSearchByCodeService: ProductSearchByCodeService = inject(
    ProductSearchByCodeService
  );
  protected productSearchByCategoryService: ProductSearchByCategoryService =
    inject(ProductSearchByCategoryService);
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
      switchMap((data) => this.handleCategoryCodes(data)),
      map((data) => {
        const componentMappingExist = !!data.composition?.inner?.length;
        const codes = data.productCodes?.trim().split(' ') ?? [];
        return { componentMappingExist, codes };
      }),
      map(({ componentMappingExist, codes }) => {
        const scope = componentMappingExist ? 'carousel' : 'carouselMinimal';
        return codes.map((code: string) =>
          this.productSearchByCodeService.get({ code, scope })
        );
      })
    );

  trackByFn: TrackByFunction<Product> = (_index: number, item: Product) =>
    item?.code;

  constructor(
    protected componentData: CmsComponentData<model>,
    protected productService: ProductService
  ) {
    useFeatureStyles('productCarouselScrolling');
  }

  handleCategoryCodes(data: model): Observable<model> {
    const categoryCodes = data?.categoryCodes?.split(' ');
    // Try to add category codes to the carousel product codes
    if (categoryCodes) {
      return zip(
        categoryCodes.map((categoryCode) =>
          this.productSearchByCategoryService.get({
            categoryCode,
            scope: ProductScope.CODE,
          })
        )
      ).pipe(
        map((results) => {
          const codes = results
            .flat()
            .map((product) => product?.code)
            .join(' ');

          return {
            ...data,
            productCodes: data.productCodes + ' ' + codes,
          };
        })
      );
    }

    return of(data);
  }
}
