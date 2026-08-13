/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, Optional } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { FeatureToggles, TranslatePipe } from '@spartacus/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';
import { ConfigureCartEntryComponent } from '../configure-cart-entry/configure-cart-entry.component';

@Component({
  selector: 'cx-configurator-issues-notification',
  templateUrl: './configurator-issues-notification.component.html',
  imports: [
    NgIf,
    IconComponent,
    ConfigureCartEntryComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class ConfiguratorIssuesNotificationComponent {
  iconTypes = ICON_TYPE;
  private featureToggles = inject(FeatureToggles);

  constructor(
    protected commonConfigUtilsService: CommonConfiguratorUtilsService,
    @Optional() protected cartItemContext: CartItemContext
  ) {}

  readonly orderEntry$: Observable<OrderEntry> =
    this.cartItemContext?.item$ ?? EMPTY;

  readonly quantityControl$: Observable<UntypedFormControl> =
    this.cartItemContext?.quantityControl$ ?? EMPTY;

  readonly readonly$: Observable<boolean> =
    this.cartItemContext?.readonly$ ?? EMPTY;

  // TODO: remove the logic below when configurable products support "Saved Cart" and "Save For Later"
  readonly shouldShowButton$: Observable<boolean> =
    this.commonConfigUtilsService.isActiveCartContext(this.cartItemContext);

  /**
   * Verifies whether the item has any issues.
   *
   * @param item - Cart item
   * @returns - whether there are any issues
   */
  hasIssues(item: OrderEntry): boolean {
    if (
      this.featureToggles.configuratorIssuesNotificationForConfigurableOnly ===
        true &&
      !item.product?.configurable
    ) {
      // Only configurable products surface configurator issues here; non-configurable
      // entries (e.g. min/max quantity violations) are handled by the cart validation UI.
      return false;
    }
    return this.commonConfigUtilsService.hasIssues(item);
  }

  /**
   * Retrieves the number of issues at the cart item.
   *
   * @param item - Cart item
   * @returns - the number of issues at the cart item
   */
  getNumberOfIssues(item: OrderEntry): number {
    return this.commonConfigUtilsService.getNumberOfIssues(item);
  }

  /**
   * Retrieves the unique id for the error message.
   *
   * @param item - Cart item
   * @returns - Unique id for error message
   */
  getErrorMessageId(item: OrderEntry): string {
    return 'cx-error-msg-' + item.entryNumber;
  }
}
