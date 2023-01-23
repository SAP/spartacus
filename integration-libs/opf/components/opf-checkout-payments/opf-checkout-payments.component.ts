/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActiveConfiguration, OpfCheckoutFacade } from '@spartacus/opf/root';
import { filter, map, tap } from 'rxjs/operators';

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
      map((state) => state.data),
      tap((activeConfiguratons) => {
        if (activeConfiguratons?.length) {
          this.selectedPaymentId = activeConfiguratons[0].id;
        }
      })
    );

  @Input()
  disabled = false;

  selectedPaymentId?: number;

  constructor(private opfCheckoutService: OpfCheckoutFacade) {}

  changePayment(payment: ActiveConfiguration): void {
    this.selectedPaymentId = payment.id;
  }
}
