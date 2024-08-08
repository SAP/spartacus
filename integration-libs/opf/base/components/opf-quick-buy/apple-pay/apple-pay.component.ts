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
import { Product } from '@spartacus/core';
import {
  OpfCartHandlerService,
  OpfPaymentErrorHandlerService,
} from '@spartacus/opf/base/core';
import {
  ActiveConfiguration,
  DigitalWalletQuickBuy,
  OpfProviderType,
  OpfQuickBuyLocation,
} from '@spartacus/opf/base/root';
import {
  CurrentProductService,
  ItemCounterService,
} from '@spartacus/storefront';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { OpfQuickBuyService } from '../opf-quick-buy.service';
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
  protected itemCounterService = inject(ItemCounterService);
  protected cartHandlerService = inject(OpfCartHandlerService);
  protected applePaySession = inject(ApplePaySessionFactory);
  protected paymentErrorHandlerService = inject(OpfPaymentErrorHandlerService);
  protected opfQuickBuyService = inject(OpfQuickBuyService);

  isApplePaySupported$: Observable<boolean>;
  applePayDigitalWallet?: DigitalWalletQuickBuy;

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

  initSingleProductTransaction(): Observable<unknown> {
    return combineLatest([
      this.currentProductService.getProduct(),
      this.cartHandlerService.isCartStable(),
    ]).pipe(
      take(1),
      switchMap(([product, _]) =>
        this.applePayService.start({
          product: product as Product,
          quantity: this.itemCounterService.getCounter(),
          countryCode: this.applePayDigitalWallet?.countryCode as string,
        })
      )
    );
  }

  initActiveCartTransaction(): Observable<unknown> {
    return this.cartHandlerService.getCurrentCart().pipe(
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
    this.opfQuickBuyService
      .getQuickBuyLocationContext()
      .pipe(
        take(1),
        switchMap((context: OpfQuickBuyLocation) => {
          if (context === OpfQuickBuyLocation.PRODUCT) {
            return this.initSingleProductTransaction();
          }

          return this.initActiveCartTransaction();
        })
      )
      .subscribe();
  }
}
