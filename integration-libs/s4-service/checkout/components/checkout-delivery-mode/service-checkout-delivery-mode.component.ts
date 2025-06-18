/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CheckoutDeliveryModeComponent } from '@spartacus/checkout/base/components';
import {
  CheckoutServiceDetailsFacade,
  S4ServiceDeliveryModeConfig,
} from '@spartacus/s4-service/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-delivery-mode',
  templateUrl: './service-checkout-delivery-mode.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ServiceCheckoutDeliveryModeComponent extends CheckoutDeliveryModeComponent {
  protected checkoutServiceDetailsFacade = inject(CheckoutServiceDetailsFacade);
  protected config = inject(S4ServiceDeliveryModeConfig);

  hasServiceProducts$: Observable<boolean> =
    this.checkoutServiceDetailsFacade.hasServiceItems();

  serviceDeliveryConfig = this.config.s4ServiceDeliveryMode;
}
