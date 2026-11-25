/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutStepService,
  FiscalIdFormComponent,
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
import { defer, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DP_CARD_REGISTRATION_STATUS } from '../../../utils/dp-constants';
import { DpPaymentCallbackComponent } from './dp-payment-callback/dp-payment-callback.component';
import { DpPaymentFormComponent } from './dp-payment-form/dp-payment-form.component';

@Component({
  selector: 'cx-payment-method',
  templateUrl: './dp-payment-method.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    CardComponent,
    FiscalIdFormComponent,
    DpPaymentFormComponent,
    SpinnerComponent,
    DpPaymentCallbackComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class DpPaymentMethodComponent extends CorePaymentMethodComponent {
  showCallbackScreen = false;
  callbackSubmitting = false;
  protected callbackPaymentPending = false;

  submitFiscalId = () =>
    defer(() => {
      if (this.busy$.value) {
        return of(false);
      }
      this.busy$.next(true);
      return (this.fiscalIdForm?.submit() ?? of(true)).pipe(
        finalize(() => this.busy$.next(false))
      );
    });

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
    this.callbackPaymentPending = true;
    this.savePaymentMethod(paymentDetails);
  }

  protected onSuccess(): void {
    super.onSuccess();
    // Callback Continue has already saved Fiscal ID before creating the card.
    // Selecting an existing card must leave time to enter Fiscal ID.
    if (this.callbackPaymentPending) {
      this.callbackPaymentPending = false;
      this.checkoutStepService.next(this.activatedRoute);
    }
  }

  protected onError(): void {
    this.callbackPaymentPending = false;
    super.onError();
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
