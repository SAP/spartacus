import { DpLocalStorageService } from './../../../facade/dp-local-storage.service';
import { DP_CARD_REGISTRATION_STATUS } from '../../../../utils/dp-constants';
import { ActivatedRoute } from '@angular/router';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { DpCheckoutPaymentService } from '../../../facade';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cx-dp-payment-callback',
  templateUrl: './dp-payment-callback.component.html',
})
export class DpPaymentCallbackComponent implements OnInit {
  @Output()
  closeCallback = new EventEmitter<any>();
  @Output()
  paymentDetailsAdded = new EventEmitter<any>();

  constructor(
    protected dpPaymentService: DpCheckoutPaymentService,
    protected dpStorageService: DpLocalStorageService,
    protected globalMsgService: GlobalMessageService,
    protected route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const dpResponse = this.route.snapshot.queryParamMap.get(
      DP_CARD_REGISTRATION_STATUS
    );
    if (dpResponse?.toLowerCase() === 'successful') {
      this.fetchPaymentDetails();
    } else {
      this.globalMsgService.add(
        { key: 'dpPaymentForm.cancelledOrFailed' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
      this.closeCallback.emit();
    }
  }

  private fetchPaymentDetails() {
    const paymentRequest = this.dpStorageService.readCardRegistrationState();

    if (paymentRequest?.sessionId && paymentRequest?.signature) {
      this.dpPaymentService
        .createPaymentDetails(
          paymentRequest.sessionId,
          paymentRequest.signature
        )
        .subscribe((details) => {
          if (details?.id) {
            this.paymentDetailsAdded.emit(details);
          } else if (details) {
            this.globalMsgService.add(
              { key: 'dpPaymentForm.error.paymentFetch' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
            this.closeCallback.emit();
          }
        });
    } else {
      this.globalMsgService.add(
        { key: 'dpPaymentForm.error.unknown' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      this.closeCallback.emit();
    }
  }
}
