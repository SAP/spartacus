/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product, ProductScope } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { ProductDetailOutlets } from '../product-outlets.model';
import { NgIf, AsyncPipe } from '@angular/common';
import { PromotionsComponent } from '../../misc/promotions/promotions.component';
import { OutletDirective } from '../../../cms-structure/outlet/outlet.directive';
import { TranslatePipe } from '../../../../core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-product-summary',
    templateUrl: './product-summary.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgIf,
        PromotionsComponent,
        OutletDirective,
        AsyncPipe,
        TranslatePipe,
        MockTranslatePipe,
    ],
})
export class ProductSummaryComponent {
  outlets = ProductDetailOutlets;

  product$: Observable<Product | null> = this.getProduct();

  protected getProduct(): Observable<Product | null> {
    const productScopes = [
      ProductScope.DETAILS,
      ProductScope.PRICE,
      ProductScope.PROMOTIONS,
    ];
    return this.currentProductService.getProduct(productScopes);
  }

  constructor(protected currentProductService: CurrentProductService) {}
}
