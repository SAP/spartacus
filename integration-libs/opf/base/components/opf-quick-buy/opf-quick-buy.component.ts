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
import { ActiveConfiguration, OpfProviderType } from '@spartacus/opf/base/root';
import { Observable } from 'rxjs';
import { OpfQuickBuyService } from './opf-quick-buy.service';

@Component({
  selector: 'cx-opf-quick-buy',
  templateUrl: './opf-quick-buy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfQuickBuyComponent implements OnInit {
  protected opfQuickBuyService = inject(OpfQuickBuyService);
  protected paymentGatewayConfig$: Observable<ActiveConfiguration>;
  protected isUserGuestOrLoggedIn$: Observable<boolean>;

  PAYMENT_METHODS = OpfProviderType;

  ngOnInit(): void {
    this.paymentGatewayConfig$ =
      this.opfQuickBuyService.getPaymentGatewayConfiguration();
    this.isUserGuestOrLoggedIn$ =
      this.opfQuickBuyService.isUserGuestOrLoggedIn();
  }

  isPaymentMethodEnabled(
    provider: OpfProviderType,
    activeConfiguration: ActiveConfiguration
  ): boolean {
    return this.opfQuickBuyService.isQuickBuyProviderEnabled(
      provider,
      activeConfiguration
    );
  }
}
