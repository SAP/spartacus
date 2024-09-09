/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product, ProductScope, I18nModule } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../../current-product.service';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-product-attributes',
    templateUrl: './product-attributes.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        AsyncPipe,
        I18nModule,
    ],
})
export class ProductAttributesComponent {
  product$: Observable<Product | null> = this.currentProductService.getProduct(
    ProductScope.ATTRIBUTES
  );

  constructor(protected currentProductService: CurrentProductService) {}
}
