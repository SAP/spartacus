/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { OpfService } from '@spartacus/opf/checkout/core';
import {
  ActiveConfiguration,
  OpfCheckoutFacade,
  OpfOtpFacade,
  OpfUi,
} from '@spartacus/opf/checkout/root';

import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-checkout-payments',
  templateUrl: './opf-checkout-payments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutPaymentsComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();

  activeConfiguratons$ = this.opfCheckoutService
    .getActiveConfigurationsState()
    .pipe(
      filter((state) => !state.loading),
      map((state) => state.data)
    );

  @Input()
  disabled = true;

  selectedPaymentId?: number;

  constructor(
    protected opfCheckoutService: OpfCheckoutFacade,
    protected opfOtpService: OpfOtpFacade,
    protected opfService: OpfService
  ) {}

  /**
   * Method pre-selects (based on terms and conditions state)
   * previously selected payment option ID by customer.
   */
  protected preselectPaymentOption() {
    this.subscription.add(
      this.opfService.getOpfUiState().subscribe((state: OpfUi) => {
        this.selectedPaymentId = state.termsAndConditionsChecked
          ? state?.selectedPaymentOptionId
          : undefined;
      })
    );
  }

  changePayment(payment: ActiveConfiguration): void {
    this.selectedPaymentId = payment.id;
    this.opfService.updateOpfUiState({
      selectedPaymentOptionId: this.selectedPaymentId,
    });
  }

  ngOnInit() {
    this.preselectPaymentOption();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
