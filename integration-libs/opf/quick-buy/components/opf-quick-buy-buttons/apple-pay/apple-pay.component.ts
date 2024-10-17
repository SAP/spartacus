/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { ActiveConfiguration } from '@spartacus/opf/base/root';
import { OpfQuickBuyTransactionService } from '@spartacus/opf/quick-buy/core';
import {
  OpfProviderType,
  OpfQuickBuyDigitalWallet,
} from '@spartacus/opf/quick-buy/root';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ApplePaySessionFactory } from './apple-pay-session';
import { ApplePayService } from './apple-pay.service';

@Component({
  selector: 'cx-opf-apple-pay',
  templateUrl: './apple-pay.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplePayComponent implements OnInit {
  @Input() activeConfiguration: ActiveConfiguration;

  protected applePayService = inject(ApplePayService);
  protected currentProductService = inject(CurrentProductService);
  protected opfQuickBuyTransactionService = inject(
    OpfQuickBuyTransactionService
  );
  protected applePaySession = inject(ApplePaySessionFactory);

  isApplePaySupported$: Observable<boolean>;
  applePayDigitalWallet?: OpfQuickBuyDigitalWallet;

  ngOnInit(): void {
    this.applePayDigitalWallet =
      this.activeConfiguration?.digitalWalletQuickBuy?.find(
        (digitalWallet) => digitalWallet.provider === OpfProviderType.APPLE_PAY
      );
    if (
      !this.applePayDigitalWallet?.merchantId ||
      !this.applePayDigitalWallet?.countryCode
    ) {
      return;
    }

    this.isApplePaySupported$ = this.applePaySession.isApplePaySupported$(
      this.applePayDigitalWallet.merchantId
    );
  }

  initActiveCartTransaction(): Observable<unknown> {
    return this.opfQuickBuyTransactionService.getCurrentCart().pipe(
      take(1),
      switchMap((cart: Cart) => {
        return this.applePayService.start({
          cart: cart,
          countryCode: this.applePayDigitalWallet?.countryCode as string,
        });
      })
    );
  }

  initTransaction(): void {
    this.opfQuickBuyTransactionService
      .getTransactionLocationContext()
      .pipe(
        take(1),
        switchMap(() => {
          return this.initActiveCartTransaction();
        })
      )
      .subscribe();
  }
}
