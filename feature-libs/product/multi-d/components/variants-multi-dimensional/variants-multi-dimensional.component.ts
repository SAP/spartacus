/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { VariantsMultiDimensionalService } from '../../core/services/variants-multi-dimensional.service';

@Component({
  selector: 'cx-variants-multi-dimensional',
  templateUrl: './variants-multi-dimensional.component.html',
  providers: [VariantsMultiDimensionalService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsMultiDimensionalComponent {
  product$ = this.multiDimensionalService.product$;

  constructor(
    protected multiDimensionalService: VariantsMultiDimensionalService
  ) {}
}
