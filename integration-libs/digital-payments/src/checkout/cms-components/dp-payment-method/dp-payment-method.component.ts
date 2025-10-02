/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutPaymentMethodComponent as CorePaymentMethodComponent,
  CheckoutStepService,
} from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressService,
  CheckoutPaymentService,
} from '@spartacus/checkout/base/core';
import {
  GlobalMessageService,
  PaymentDetails,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import { DP_CARD_REGISTRATION_STATUS } from '../../../utils/dp-constants';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { CardComponent } from '@spartacus/storefront';
import { DpPaymentFormComponent } from './dp-payment-form/dp-payment-form.component';
import { SpinnerComponent } from '@spartacus/storefront';
import { DpPaymentCallbackComponent } from './dp-payment-callback/dp-payment-callback.component';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-payment-method',
  templateUrl: './dp-payment-method.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    CardComponent,
    DpPaymentFormComponent,
    SpinnerComponent,
    DpPaymentCallbackComponent,
    AsyncPipe,
    TranslatePipe,
    TranslatePipe,
  ],
})
export class DpPaymentMethodComponent extends CorePaymentMethodComponent {
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
  constructor(
    protected userPaymentService: UserPaymentService,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressService,
    protected checkoutPaymentFacade: CheckoutPaymentService,
    protected activatedRoute: ActivatedRoute,
    protected translationService: TranslationService,
    protected activeCartFacade: ActiveCartFacade,
    protected checkoutStepService: CheckoutStepService,
    protected globalMessageService: GlobalMessageService
  ) {
    super(
      userPaymentService,
      checkoutDeliveryAddressFacade,
      checkoutPaymentFacade,
      activatedRoute,
      translationService,
      activeCartFacade,
      checkoutStepService,
      globalMessageService
    );

    this.showCallbackScreen = this.isDpCallback();
  }
}
