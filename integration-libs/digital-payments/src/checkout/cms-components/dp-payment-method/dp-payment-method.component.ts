import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PaymentMethodComponent as CorePaymentMethodComponent } from '@spartacus/checkout/components';
import { PaymentDetails } from '@spartacus/core';
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

    return Boolean(queryParams);
  }

  hideCallbackScreen(): void {
    this.showCallbackScreen = false;
  }

  paymentDetailsAdded(paymentDetails: PaymentDetails) {
    this.selectPaymentMethod(paymentDetails);
    this.next();
  }

  ngOnInit() {
    this.showCallbackScreen = this.isDpCallback();
    super.ngOnInit();
  }
}
