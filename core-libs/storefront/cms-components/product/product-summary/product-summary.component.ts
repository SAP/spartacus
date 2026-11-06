/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product, ProductScope, TranslatePipe } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OutletDirective } from '../../../cms-structure/outlet/outlet.directive';
import { PromotionsComponent } from '../../misc/promotions/promotions.component';
import { CurrentProductService } from '../current-product.service';
import { ProductDetailOutlets } from '../product-outlets.model';

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
