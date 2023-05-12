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
import { OpfService } from '@spartacus/opf/core';
import {
  ActiveConfiguration,
  OpfCheckoutFacade,
  OpfOtpFacade,
  OpfUi,
} from '@spartacus/opf/root';
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

  changePayment(payment: ActiveConfiguration): void {
    this.selectedPaymentId = payment.id;
    this.opfService.updateOpfUiState({
      selectedPaymentOptionId: this.selectedPaymentId,
    });
  }

  ngOnInit(): void {
    this.subscription.add(
      this.opfService.getOpfUiState().subscribe((state: OpfUi) => {
        this.selectedPaymentId = state.termsAndConditionsChecked
          ? state?.selectedPaymentOptionId
          : undefined;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
