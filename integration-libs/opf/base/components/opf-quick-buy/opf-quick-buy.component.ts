/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveConfiguration, OpfProviderType } from '../../root/model';
import { OpfQuickBuyService } from './opf-quick-buy.service';

@Component({
  selector: 'cx-opf-quick-buy',
  templateUrl: './opf-quick-buy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfQuickBuyComponent implements OnInit {
  protected opfQuickBuyService = inject(OpfQuickBuyService);

  protected paymentGatewayConfig$: Observable<ActiveConfiguration>;

  PAYMENT_METHODS = OpfProviderType;

  ngOnInit(): void {
    this.paymentGatewayConfig$ =
      this.opfQuickBuyService.getPaymentGatewayConfiguration();
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
