/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActiveConfiguration } from '@spartacus/opf/base/root';
import { OpfProviderType } from '@spartacus/opf/quick-buy/root';
import { Observable } from 'rxjs';
import { OpfQuickBuyButtonsService } from './opf-quick-buy-buttons.service';

@Component({
  selector: 'cx-opf-quick-buy-buttons',
  templateUrl: './opf-quick-buy-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfQuickBuyButtonsComponent implements OnInit {
  protected opfQuickBuyButtonsService = inject(OpfQuickBuyButtonsService);
  protected paymentGatewayConfig$: Observable<ActiveConfiguration>;
  protected isUserGuestOrLoggedIn$: Observable<boolean>;

  PAYMENT_METHODS = OpfProviderType;

  ngOnInit(): void {
    this.paymentGatewayConfig$ =
      this.opfQuickBuyButtonsService.getPaymentGatewayConfiguration();
    this.isUserGuestOrLoggedIn$ =
      this.opfQuickBuyButtonsService.isUserGuestOrLoggedIn();
  }

  isPaymentMethodEnabled(
    provider: OpfProviderType,
    activeConfiguration: ActiveConfiguration
  ): boolean {
    return this.opfQuickBuyButtonsService.isQuickBuyProviderEnabled(
      provider,
      activeConfiguration
    );
  }
}
