/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ElementRef } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { CxEvent } from '@spartacus/core';

/**
 * Indicates the opening of the Subscription charges dialog from cart page.
 */
export class ViewSubscriptionChargesEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'ViewSubscriptionChargesEvent';

  /**
   * Since the event can be used to open a dialog, we need to know which element triggered it.
   * This way we can refocus on it after the dialog is closed.
   */
  triggerElementRef?: ElementRef;

  data?: OrderEntry;
}
