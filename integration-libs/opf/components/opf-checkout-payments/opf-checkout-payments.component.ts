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
  disabled = true;

  selectedPaymentId?: number;

  constructor(private opfCheckoutService: OpfCheckoutFacade) {}

  changePayment(payment: ActiveConfiguration): void {
    console.log(payment);
    this.selectedPaymentId = payment.id;

    this.opfCheckoutService.initiatePayment({
      configurationId: String(this.selectedPaymentId),
      cartId: '00011002',
      resultURL: 'https://localhost:4200/redirect/success',
      cancelURL: 'https://localhost:4200/redirect/failure',
      channel: 'BROWSER',
      // browserInfo: {
      //   acceptHeader: 'application/json',
      //   colorDepth: 123,
      //   javaEnabled: true,
      //   javaScriptEnabled: true,
      //   language: 'en',
      //   screenHeight: 1024,
      //   screenWidth: 768,
      //   userAgent: 'Mozilla Firefox',
      //   timeZoneOffset: 3,
      //   ipAddress: '10.0.0.1',
      //   originUrl: 'https://localhost:4200',
      // },
    });
  }
}
