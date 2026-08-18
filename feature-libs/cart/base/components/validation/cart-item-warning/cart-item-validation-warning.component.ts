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
  Input,
} from '@angular/core';
import { FeatureToggles, TranslatePipe } from '@spartacus/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { map } from 'rxjs/operators';
import { CartConfigService } from '@spartacus/cart/base/core';
import {
  CartValidationFacade,
  cartModificationMatchesCode,
  isQuantityLimitViolation,
} from '@spartacus/cart/base/root';

@Component({
  selector: 'cx-cart-item-validation-warning',
  templateUrl: './cart-item-validation-warning.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, IconComponent, AsyncPipe, TranslatePipe],
})
export class CartItemValidationWarningComponent {
  private featureToggles = inject(FeatureToggles);
  protected cartConfigService = inject(CartConfigService);

  @Input()
  code: string;

  iconTypes = ICON_TYPE;
  isVisible = true;
  /**
   * Whether backend-driven min/max validation messaging is active: both the
   * `cart.validation.enabled` config and the `cartValidationDisplayBackendMessages`
   * feature toggle must be on.
   */
  displayBackendMessages =
    this.cartConfigService.isCartValidationEnabled() &&
    !!this.featureToggles.cartValidationDisplayBackendMessages;

  cartModification$ = this.cartValidationFacade.getValidationResults().pipe(
    map((modificationList) =>
      modificationList.find((modification) =>
        cartModificationMatchesCode(
          modification,
          this.code,
          this.displayBackendMessages
        )
      )
    )
  );

  constructor(protected cartValidationFacade: CartValidationFacade) {}

  /**
   * Whether the modification is a min/max order quantity violation. For these the
   * raw `statusMessage` alert is suppressed, since the limit is already conveyed by
   * the per-item quantity hint and the highlighted row.
   */
  isQuantityLimitViolation = isQuantityLimitViolation;
}
