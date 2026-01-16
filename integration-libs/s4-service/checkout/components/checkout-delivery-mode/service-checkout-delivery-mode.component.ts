/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutDeliveryModeComponent } from '@spartacus/checkout/base/components';
import { TranslatePipe } from '@spartacus/core';
import {
  CheckoutServiceDetailsFacade,
  S4ServiceDeliveryModeConfig,
} from '@spartacus/s4-service/root';
import {
  InnerComponentsHostDirective,
  OutletDirective,
  SpinnerComponent,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-delivery-mode',
  templateUrl: './service-checkout-delivery-mode.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    OutletDirective,
    SpinnerComponent,
    InnerComponentsHostDirective,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class ServiceCheckoutDeliveryModeComponent extends CheckoutDeliveryModeComponent {
  protected checkoutServiceDetailsFacade = inject(CheckoutServiceDetailsFacade);
  protected config = inject(S4ServiceDeliveryModeConfig);

  hasServiceProducts$: Observable<boolean> =
    this.checkoutServiceDetailsFacade.hasServiceItems();

  serviceDeliveryConfig = this.config.s4ServiceDeliveryMode;
}
