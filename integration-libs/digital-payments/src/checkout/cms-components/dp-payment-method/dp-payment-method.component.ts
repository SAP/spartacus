import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CheckoutStepService,
  PaymentMethodComponent as CorePaymentMethodComponent,
} from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
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

  // TODO:#checkout - handle breaking changes
  constructor(
    protected userPaymentService: UserPaymentService,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected checkoutPaymentFacade: CheckoutPaymentFacade,
    protected globalMessageService: GlobalMessageService,
    protected activatedRoute: ActivatedRoute,
    protected translationService: TranslationService,
    protected activeCartService: ActiveCartService,
    protected checkoutStepService: CheckoutStepService
  ) {
    super(
      userPaymentService,
      checkoutDeliveryAddressFacade,
      checkoutPaymentFacade,
      globalMessageService,
      activatedRoute,
      translationService,
      activeCartService,
      checkoutStepService
    );

    this.showCallbackScreen = this.isDpCallback();
  }
}
