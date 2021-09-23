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
  CheckoutService,
  CheckoutDeliveryService,
  CheckoutPaymentService,
} from '@spartacus/checkout/core';

@Component({
  selector: 'cx-payment-method',
  templateUrl: './dp-payment-method.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DpPaymentMethodComponent
  extends CorePaymentMethodComponent
  implements OnInit
{
  showCallbackScreen = false;

  isDpCallback(): boolean {
    const queryParams = this.activatedRoute.snapshot.queryParamMap.get(
      DP_CARD_REGISTRATION_STATUS
    );
    if (queryParams) {
      return true;
    } else {
      return false;
    }
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
    protected checkoutService: CheckoutService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected globalMessageService: GlobalMessageService,
    protected activatedRoute: ActivatedRoute,
    protected translation: TranslationService,
    protected activeCartService: ActiveCartService,
    protected checkoutStepService: CheckoutStepService
  ) {
    super(
      userPaymentService,
      checkoutService,
      checkoutDeliveryService,
      checkoutPaymentService,
      globalMessageService,
      activatedRoute,
      translation,
      activeCartService,
      checkoutStepService
    );

    this.showCallbackScreen = this.isDpCallback();
  }
}
