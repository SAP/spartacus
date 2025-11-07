/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

@Component({
  selector: 'cx-payment-method',
  templateUrl: './dp-payment-method.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DpPaymentMethodComponent extends CorePaymentMethodComponent {
  protected userPaymentService: UserPaymentService;
  protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressService;
  protected checkoutPaymentFacade: CheckoutPaymentService;
  protected activatedRoute: ActivatedRoute;
  protected translationService: TranslationService;
  protected activeCartFacade: ActiveCartFacade;
  protected checkoutStepService: CheckoutStepService;
  protected globalMessageService: GlobalMessageService;

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
    const userPaymentService = inject(UserPaymentService);
    const checkoutDeliveryAddressFacade = inject(CheckoutDeliveryAddressService);
    const checkoutPaymentFacade = inject(CheckoutPaymentService);
    const activatedRoute = inject(ActivatedRoute);
    const translationService = inject(TranslationService);
    const activeCartFacade = inject(ActiveCartFacade);
    const checkoutStepService = inject(CheckoutStepService);
    const globalMessageService = inject(GlobalMessageService);

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
    this.userPaymentService = userPaymentService;
    this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
    this.checkoutPaymentFacade = checkoutPaymentFacade;
    this.activatedRoute = activatedRoute;
    this.translationService = translationService;
    this.activeCartFacade = activeCartFacade;
    this.checkoutStepService = checkoutStepService;
    this.globalMessageService = globalMessageService;


    this.showCallbackScreen = this.isDpCallback();
  }
}
