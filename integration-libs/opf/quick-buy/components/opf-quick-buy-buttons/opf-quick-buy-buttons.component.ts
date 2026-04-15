/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { OpfActiveConfiguration } from '@spartacus/opf/base/root';
import { OpfQuickBuyProviderType } from '@spartacus/opf/quick-buy/root';
import { Observable } from 'rxjs';
import { ApplePayComponent } from './apple-pay/apple-pay.component';
import { OpfGooglePayComponent } from './google-pay/google-pay.component';
import { OpfQuickBuyButtonsService } from './opf-quick-buy-buttons.service';

@Component({
  selector: 'cx-opf-quick-buy-buttons',
  templateUrl: './opf-quick-buy-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, ApplePayComponent, OpfGooglePayComponent, AsyncPipe],
})
export class OpfQuickBuyButtonsComponent implements OnInit {
  protected opfQuickBuyButtonsService = inject(OpfQuickBuyButtonsService);
  protected paymentGatewayConfig$: Observable<OpfActiveConfiguration[]>;

  PAYMENT_METHODS = OpfQuickBuyProviderType;

  ngOnInit(): void {
    this.paymentGatewayConfig$ =
      this.opfQuickBuyButtonsService.getPaymentGatewayConfiguration();
  }

  isPaymentMethodEnabled(
    provider: OpfQuickBuyProviderType,
    activeConfiguration: OpfActiveConfiguration[]
  ): boolean {
    return this.opfQuickBuyButtonsService.isQuickBuyProviderEnabled(
      provider,
      activeConfiguration
    );
  }
}
