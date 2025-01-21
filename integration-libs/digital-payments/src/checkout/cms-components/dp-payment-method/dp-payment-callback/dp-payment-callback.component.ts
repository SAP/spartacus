/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DpLocalStorageService } from './../../../facade/dp-local-storage.service';
import { DP_CARD_REGISTRATION_STATUS } from '../../../../utils/dp-constants';
import { ActivatedRoute } from '@angular/router';
import {
  Address,
  FeatureConfigService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { DpCheckoutPaymentService } from '../../../facade';
import { Component, OnInit, EventEmitter, Output, inject } from '@angular/core';
import { CheckoutBillingAddressFormService } from '@spartacus/checkout/base/components';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { take } from 'rxjs';

@Component({
  selector: 'cx-dp-payment-callback',
  templateUrl: './dp-payment-callback.component.html',
})
export class DpPaymentCallbackComponent implements OnInit {
  @Output()
  closeCallback = new EventEmitter<any>();
  @Output()
  paymentDetailsAdded = new EventEmitter<any>();

  protected featureConfig = inject(FeatureConfigService);
  protected billingAddressService = inject(CheckoutBillingAddressFormService);
  protected launchDialogService = inject(LaunchDialogService);
  showBillingAddressForm = false;

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
      if (this.featureConfig.isEnabled('showBillingAddressInDigitalPayments')) {
        this.showBillingAddressForm = true;
      } else {
        this.fetchPaymentDetails();
      }
    } else {
      this.globalMsgService.add(
        { key: 'dpPaymentForm.cancelledOrFailed' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
      this.closeCallback.emit();
    }
  }

  back(): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.DP_SHOW_CONFIRMATION_DIALOG,
      undefined,
      undefined
    );
    if (dialog) {
      dialog.pipe(take(1)).subscribe((result) => {
        if (result.instance.cardSaveCancelled === true) {
          this.globalMsgService.add(
            { key: 'dpPaymentForm.cancelledOrFailed' },
            GlobalMessageType.MSG_TYPE_WARNING
          );
          this.closeCallback.emit();
        }
      });
    }
  }
  next(): void {
    if (
      this.billingAddressService.isBillingAddressSameAsDeliveryAddress() ||
      this.billingAddressService.isBillingAddressFormValid()
    ) {
      const billingAddress: Address =
        this.billingAddressService.getBillingAddress();
      this.fetchPaymentDetails(billingAddress);
    } else {
      this.billingAddressService.markAllAsTouched();
    }
  }

  private fetchPaymentDetails(billingAddress?: Address) {
    const paymentRequest = this.dpStorageService.readCardRegistrationState();

    if (paymentRequest?.sessionId && paymentRequest?.signature) {
      this.dpPaymentService
        .createPaymentDetails(
          paymentRequest.sessionId,
          paymentRequest.signature,
          billingAddress
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
