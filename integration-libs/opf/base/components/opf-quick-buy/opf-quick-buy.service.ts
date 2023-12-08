/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  ActiveConfiguration,
  OpfPaymentFacade,
  OpfPaymentProviderType,
  OpfProviderType,
} from '@spartacus/opf/base/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OpfQuickBuyService {
  protected opfPaymentFacade = inject(OpfPaymentFacade);

  getPaymentGatewayConfiguration(): Observable<ActiveConfiguration> {
    return this.opfPaymentFacade
      .getActiveConfigurationsState()
      .pipe(
        map(
          (config) =>
            (config?.data || []).filter(
              (item) =>
                item?.providerType === OpfPaymentProviderType.PAYMENT_GATEWAY
            )[0]
        )
      );
  }

  isQuickBuyProviderEnabled(
    provider: OpfProviderType,
    activeConfiguration: ActiveConfiguration
  ): boolean {
    let isEnabled = false;
    if (activeConfiguration && activeConfiguration.digitalWalletQuickBuy) {
      isEnabled = Boolean(
        activeConfiguration?.digitalWalletQuickBuy.find(
          (item) => item.provider === provider
        )?.enabled
      );
    }

    return isEnabled;
  }
}
