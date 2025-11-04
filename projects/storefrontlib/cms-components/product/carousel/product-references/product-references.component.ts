/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, TrackByFunction, inject } from '@angular/core';
import {
  CmsProductReferencesComponent,
  isNotNullable,
  Product,
  ProductReference,
  ProductReferenceService,
  useFeatureStyles,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { CurrentProductService } from '../../current-product.service';

@Component({
  selector: 'cx-product-references',
  templateUrl: './product-references.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ProductReferencesComponent {
  protected cmsComponentData = inject<CmsComponentData<CmsProductReferencesComponent>>(CmsComponentData);
  protected currentProductService = inject(CurrentProductService);
  protected productReferenceService = inject(ProductReferenceService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    useFeatureStyles('productCarouselScrolling');
  }

  protected get componentData$(): Observable<CmsProductReferencesComponent> {
    return this.cmsComponentData.data$.pipe(filter((data) => Boolean(data)));
  }

  /**
   * Returns an Observable String for the product code
   */
  protected get productCode$(): Observable<string> {
    return this.currentProductService.getProduct().pipe(
      filter(isNotNullable),
      map((product) => product.code ?? ''),
      tap((_) => this.productReferenceService.cleanReferences())
    );
  }

  /**
   * Returns an Observable String for the title
   */
  get title$(): Observable<string | undefined> {
    return this.componentData$.pipe(map((data) => data?.title));
  }

  /**
   * Observable with an Array of Observables. This is done so that
   * the component UI could consider to lazy load the UI components when they're
   * in the viewpoint.
   */
  items$: Observable<Observable<Product | undefined>[]> =
    this.productCode$.pipe(
      withLatestFrom(this.componentData$),
      tap(([productCode, data]) =>
        this.productReferenceService.loadProductReferences(
          productCode,
          data.productReferenceTypes
        )
      ),
      switchMap(([productCode, data]) =>
        this.getProductReferences(productCode, data.productReferenceTypes ?? '')
      )
    );

  /**
   * Returns an observable for product references
   */
  private getProductReferences(
    code: string,
    referenceType: string
  ): Observable<Observable<Product | undefined>[]> {
    return this.productReferenceService
      .getProductReferences(code, referenceType)
      .pipe(
        filter((references) => Boolean(references)),
        map((references: ProductReference[]) =>
          references.map((reference) => of(reference.target))
        )
      );
  }

  trackByFn: TrackByFunction<Product> = (_index: number, item: Product) =>
    item?.code;
}
