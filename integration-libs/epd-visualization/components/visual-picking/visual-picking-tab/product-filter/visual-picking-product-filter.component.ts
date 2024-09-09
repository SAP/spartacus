/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICON_TYPE, IconModule } from '@spartacus/storefront';
import { VisualPickingProductFilterService } from './visual-picking-product-filter.service';
import { I18nModule } from '@spartacus/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'cx-epd-visualization-product-filter',
    templateUrl: './visual-picking-product-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        IconModule,
        I18nModule,
    ],
})
export class VisualPickingProductFilterComponent {
  constructor(
    protected visualPickingProductFilterService: VisualPickingProductFilterService
  ) {}

  /**
   * The filter input value.
   */
  @Input()
  set filter(filter: string) {
    this.visualPickingProductFilterService.filter = filter;
  }
  get filter() {
    return this.visualPickingProductFilterService.filter;
  }

  iconTypes = ICON_TYPE;
}
