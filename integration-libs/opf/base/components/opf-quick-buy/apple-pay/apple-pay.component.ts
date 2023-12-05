/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Product } from '@spartacus/core';
import { OpfCartHandlerService } from '@spartacus/opf/base/core';
import { ActiveConfiguration, OpfProviderType } from '@spartacus/opf/base/root';
import {
  CurrentProductService,
  ItemCounterService,
} from '@spartacus/storefront';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApplePayService } from './apple-pay.service';

@Component({
  selector: 'cx-opf-apple-pay',
  templateUrl: './apple-pay.component.html',
})
export class ApplePayComponent implements OnInit, OnDestroy {
  @Input() activeConfiguration: ActiveConfiguration;

  protected applePayService = inject(ApplePayService);
  protected currentProductService = inject(CurrentProductService);
  protected itemCounterService = inject(ItemCounterService);
  protected cartHandlerService = inject(OpfCartHandlerService);

  protected sub: Subscription;
  isApplePaySupported$: Observable<boolean>;

  ngOnInit(): void {
    const merchantId =
      this.activeConfiguration?.digitalWalletQuickBuy?.find(
        (dw) => dw.merchantId === OpfProviderType.APPLE_PAY
      )?.merchantId ?? 'merchant.com.adyen.upscale.test';
    if (!merchantId) {
      // unreachable block as merchantId property still in dev on server side
      return;
    }
    this.isApplePaySupported$ =
      this.applePayService.isApplePaySupported$(merchantId);
  }

  quickBuyProduct(): void {
    this.sub = combineLatest([
      this.currentProductService.getProduct(),
      this.cartHandlerService.checkStableCart(),
    ])
      .pipe(
        switchMap(([product, _]) =>
          this.applePayService.start(
            product as Product,
            this.itemCounterService.getCounter(),
            this.activeConfiguration.acquirerCountryCode
          )
        )
      )
      .subscribe(() => {});
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
