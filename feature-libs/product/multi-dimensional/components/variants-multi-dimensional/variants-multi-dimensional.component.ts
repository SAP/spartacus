/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { isNotNullable, Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, shareReplay } from 'rxjs/operators';
import { CurrentProductService } from '@spartacus/storefront';

@Component({
  selector: 'cx-variants-multi-dimensional',
  templateUrl: './variants-multi-dimensional.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsMultiDimensionalComponent {
  protected currentProductService: CurrentProductService = inject(
    CurrentProductService
  );

  product$: Observable<Product> = this.currentProductService
    .getProduct()
    .pipe(filter(isNotNullable), distinctUntilChanged(), shareReplay(1));
}
