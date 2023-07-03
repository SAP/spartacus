/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product, ProductScope } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../../current-product.service';

@Component({
  selector: 'cx-product-attributes',
  templateUrl: './product-attributes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAttributesComponent {
  product$: Observable<Product | null> = this.currentProductService.getProduct(
    ProductScope.ATTRIBUTES
  );

  constructor(protected currentProductService: CurrentProductService) {}
}
