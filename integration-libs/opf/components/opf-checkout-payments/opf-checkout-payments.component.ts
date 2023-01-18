/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActiveConfiguration, OpfCheckoutFacade } from '@spartacus/opf/root';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-checkout-payments',
  templateUrl: './opf-checkout-payments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutPaymentsComponent {
  activeConfiguratons$ = this.opfCheckoutService.getActiveConfigurations().pipe(
    tap((activeConfiguratons) => {
      if (activeConfiguratons.length) {
        this.selectedPaymentId = activeConfiguratons[0].id;
      }
    })
  );

  selectedPaymentId?: number;

  constructor(private opfCheckoutService: OpfCheckoutFacade) {}

  changePayment(payment: ActiveConfiguration): void {
    this.selectedPaymentId = payment.id;
  }
}
