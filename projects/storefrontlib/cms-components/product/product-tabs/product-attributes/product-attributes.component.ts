/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product, ProductScope } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../../current-product.service';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { TranslatePipe } from '../../../../../core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-product-attributes',
    templateUrl: './product-attributes.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgIf,
        NgFor,
        AsyncPipe,
        TranslatePipe,
        MockTranslatePipe,
    ],
})
export class ProductAttributesComponent {
  product$: Observable<Product | null> = this.currentProductService.getProduct(
    ProductScope.ATTRIBUTES
  );

  constructor(protected currentProductService: CurrentProductService) {}
}
