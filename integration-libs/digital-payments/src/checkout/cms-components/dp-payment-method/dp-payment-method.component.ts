import { DP_CARD_REGISTRATION_STATUS } from '../../../utils/dp-constants';
import { ActivatedRoute } from '@angular/router';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  CheckoutStepService,
  PaymentMethodComponent as CorePaymentMethodComponent,
} from '@spartacus/checkout/components';

import {
  UserPaymentService,
  GlobalMessageService,
  TranslationService,
  ActiveCartService,
  PaymentDetails,
} from '@spartacus/core';

import {
  CheckoutFacade,
  CheckoutDeliveryFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/root';

@Component({
  selector: 'cx-payment-method',
  templateUrl: './dp-payment-method.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DpPaymentMethodComponent
  extends CorePaymentMethodComponent
  implements OnInit {
  showCallbackScreen = false;

  isDpCallback(): boolean {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    return DP_CARD_REGISTRATION_STATUS in queryParams;
  }

  hideCallbackScreen(): void {
    this.showCallbackScreen = false;
  }

  paymentDetailsAdded(paymentDetails: PaymentDetails) {
    this.selectPaymentMethod(paymentDetails);
    this.next();
  }

  constructor(
    protected userPaymentService: UserPaymentService,
    protected CheckoutFacade: CheckoutFacade,
    protected CheckoutDeliveryFacade: CheckoutDeliveryFacade,
    protected CheckoutPaymentFacade: CheckoutPaymentFacade,
    protected globalMessageService: GlobalMessageService,
    protected activatedRoute: ActivatedRoute,
    protected translation: TranslationService,
    protected activeCartService: ActiveCartService,
    protected checkoutStepService: CheckoutStepService
  ) {
    super(
      userPaymentService,
      CheckoutFacade,
      CheckoutDeliveryFacade,
      CheckoutPaymentFacade,
      globalMessageService,
      activatedRoute,
      translation,
      activeCartService,
      checkoutStepService
    );

    this.showCallbackScreen = this.isDpCallback();
  }
}
