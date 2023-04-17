/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ActiveConfiguration,
  OpfCheckoutFacade,
  OpfOtpFacade,
} from '@spartacus/opf/root';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-checkout-payments',
  templateUrl: './opf-checkout-payments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutPaymentsComponent {
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
    protected opfOtpService: OpfOtpFacade
  ) {}

  changePayment(payment: ActiveConfiguration): void {
    this.selectedPaymentId = payment.id;
  }
}
