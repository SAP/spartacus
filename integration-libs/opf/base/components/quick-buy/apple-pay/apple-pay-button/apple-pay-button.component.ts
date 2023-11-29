/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { ApplePayService } from '../apple-pay.service';

@Component({
  selector: 'apple-pay-button',
  template: `
    <ng-container *ngIf="isApplePaySupported$ | async">
      <div class="apple-pay-button apple-pay-button-black btn btn-block"></div>
    </ng-container>
  `,
  styleUrls: ['./apple-pay-button.component.scss'],
})
export class ApplePayButtonComponent {
  constructor(private applePayService: ApplePayService) {}

  isApplePaySupported$ = this.applePayService.isApplePaySupported$();
}
