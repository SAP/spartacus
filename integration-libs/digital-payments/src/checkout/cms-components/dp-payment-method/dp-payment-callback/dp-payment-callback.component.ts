/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  CheckoutBillingAddressFormComponent,
  CheckoutBillingAddressFormService,
} from '@spartacus/checkout/base/components';
import {
  Address,
  GlobalMessageService,
  GlobalMessageType,
  PaymentDetails,
  TranslatePipe,
} from '@spartacus/core';
import {
  LAUNCH_CALLER,
  LaunchDialogService,
  SpinnerComponent,
} from '@spartacus/storefront';
import {
  EMPTY,
  Observable,
  defer,
  filter,
  finalize,
  of,
  switchMap,
  take,
} from 'rxjs';
import { DP_CARD_REGISTRATION_STATUS } from '../../../../utils/dp-constants';
import { DpCheckoutPaymentService } from '../../../facade';
import { DpLocalStorageService } from './../../../facade/dp-local-storage.service';

@Component({
  selector: 'cx-dp-payment-callback',
  templateUrl: './dp-payment-callback.component.html',
  imports: [
    NgIf,
    CheckoutBillingAddressFormComponent,
    SpinnerComponent,
    TranslatePipe,
  ],
})
export class DpPaymentCallbackComponent implements OnInit {
  @Input() submitAdditionalFields: () => Observable<boolean> = () => of(true);
  @Input() busy = false;
  @Output() submittingChange = new EventEmitter<boolean>();
  submitting = false;
  protected destroyRef = inject(DestroyRef);

  @Output()
  closeCallback = new EventEmitter<any>();
  @Output()
  paymentDetailsAdded = new EventEmitter<any>();

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
      this.showBillingAddressForm = true;
    } else {
      this.globalMsgService.add(
        { key: 'dpPaymentForm.cancelledOrFailed' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
      this.closeCallback.emit();
    }
  }

  back(): void {
    if (this.busy || this.submitting) {
      return;
    }
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
    if (this.busy || this.submitting) {
      return;
    }
    if (
      this.billingAddressService.isBillingAddressSameAsDeliveryAddress() ||
      this.billingAddressService.isBillingAddressFormValid()
    ) {
      const billingAddress: Address =
        this.billingAddressService.getBillingAddress();
      this.submitting = true;
      this.submittingChange.emit(true);
      defer(() => this.submitAdditionalFields())
        .pipe(
          take(1),
          filter(Boolean),
          switchMap(() => this.fetchPaymentDetails(billingAddress)),
          takeUntilDestroyed(this.destroyRef),
          finalize(() => {
            this.submitting = false;
            this.submittingChange.emit(false);
          })
        )
        .subscribe({
          next: (details) => {
            if (details?.id) {
              this.paymentDetailsAdded.emit(details);
            } else if (details) {
              this.globalMsgService.add(
                { key: 'dpPaymentForm.error.paymentFetch' },
                GlobalMessageType.MSG_TYPE_ERROR
              );
              this.closeCallback.emit();
            }
          },
          error: () => {
            this.globalMsgService.add(
              { key: 'dpPaymentForm.error.paymentFetch' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
          },
        });
    } else {
      this.billingAddressService.markAllAsTouched();
    }
  }

  private fetchPaymentDetails(
    billingAddress?: Address
  ): Observable<PaymentDetails> {
    const paymentRequest = this.dpStorageService.readCardRegistrationState();

    if (paymentRequest?.sessionId && paymentRequest?.signature) {
      return this.dpPaymentService.createPaymentDetails(
        paymentRequest.sessionId,
        paymentRequest.signature,
        billingAddress
      );
    } else {
      this.globalMsgService.add(
        { key: 'dpPaymentForm.error.unknown' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      this.closeCallback.emit();
      return EMPTY;
    }
  }
}
