/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutStepService,
  CheckoutPaymentMethodComponent as CorePaymentMethodComponent,
} from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressService,
  CheckoutPaymentService,
} from '@spartacus/checkout/base/core';
import {
  GlobalMessageService,
  PaymentDetails,
  TranslatePipe,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import { CardComponent, SpinnerComponent } from '@spartacus/storefront';
import { DP_CARD_REGISTRATION_STATUS } from '../../../utils/dp-constants';
import { DpPaymentCallbackComponent } from './dp-payment-callback/dp-payment-callback.component';
import { DpPaymentFormComponent } from './dp-payment-form/dp-payment-form.component';

@Component({
  selector: 'cx-payment-method',
  templateUrl: './dp-payment-method.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    DpPaymentFormComponent,
    SpinnerComponent,
    DpPaymentCallbackComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class DpPaymentMethodComponent extends CorePaymentMethodComponent {
  protected override userPaymentService = inject(UserPaymentService);
  protected override checkoutDeliveryAddressFacade = inject(
    CheckoutDeliveryAddressService
  );
  protected override checkoutPaymentFacade = inject(CheckoutPaymentService);
  protected override activatedRoute = inject(ActivatedRoute);
  protected override translationService = inject(TranslationService);
  protected override activeCartFacade = inject(ActiveCartFacade);
  protected override checkoutStepService = inject(CheckoutStepService);
  protected override globalMessageService = inject(GlobalMessageService);

  showCallbackScreen = false;

  isDpCallback(): boolean {
    const queryParams = this.activatedRoute.snapshot.queryParamMap.get(
      DP_CARD_REGISTRATION_STATUS
    );

    return !!queryParams;
  }

  hideCallbackScreen(): void {
    this.showCallbackScreen = false;
  }

  paymentDetailsAdded(paymentDetails: PaymentDetails) {
    this.savePaymentMethod(paymentDetails);
  }

  protected onSuccess(): void {
    super.onSuccess();
    this.next();
  }

  // TODO:#checkout - handle breaking changes
  constructor() {
    super();
    this.showCallbackScreen = this.isDpCallback();
  }
}
