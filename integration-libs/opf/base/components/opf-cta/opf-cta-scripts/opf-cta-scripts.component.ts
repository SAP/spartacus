/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutBillingAddressFacade,
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
} from '@spartacus/checkout/base/root';
import { EventService, Product, UserAddressService } from '@spartacus/core';
import { OpfPaymentFacade } from '@spartacus/opf/base/root';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import { ApplePayService } from '../../quick-buy/apple-pay/apple-pay.service';
import { OpfCtaScriptsService } from './opf-cta-scripts.service';

@Component({
  selector: 'cx-opf-cta-scripts',
  templateUrl: './opf-cta-scripts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCtaScriptsComponent implements OnInit, OnDestroy {
  protected opfCtaScriptService = inject(OpfCtaScriptsService);
  protected eventService = inject(EventService);
  protected checkoutDeliveryModesFacade = inject(CheckoutDeliveryModesFacade);
  protected checkoutDeliveryAddressFacade = inject(
    CheckoutDeliveryAddressFacade
  );
  protected userAddressService = inject(UserAddressService);

  protected applePayService = inject(ApplePayService);
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected activeCartService = inject(ActiveCartFacade);
  protected currentProductService = inject(CurrentProductService);
  protected checkoutBillingAddressFacade = inject(CheckoutBillingAddressFacade);
  // constructor(protected activeCartService: ActiveCartService) {}

  canMakePayment$ = this.applePayService.canMakePayment$.pipe(
    tap((val) => console.log('canMakePayment', val))
  );

  _subs: Array<Subscription> = [];

  selectedProduct$: Observable<Product | null>;
  quantity = 1;
  showApplePayButton = false;
  currentCart = '';

  applePayPayment: ApplePayJS.ApplePayPayment;
  ctaHtmls$ = this.opfCtaScriptService.getCtaHtmlslList().pipe(
    catchError(() => {
      return of([]);
    })
  );

  ngOnInit(): void {
    console.log('On INIT');
    this.selectedProduct$ = this.currentProductService.getProduct();

    this.userAddressService.loadAddresses();
  }

  ngOnDestroy() {
    console.log('destroyed');
    this._subs.forEach((s) => s.unsubscribe());
  }

  set subs(sub: Subscription) {
    this._subs.push(sub);
  }

  quickBuyProduct(): void {
    console.log('quickBuy clicked');
    this._subs.forEach((s) => s.unsubscribe());

    this.subs = combineLatest([
      this.selectedProduct$,
      this.activeCartService.isStable(),
    ]) //this.selectedProduct$
      .pipe(
        filter(([_, isStable]) => isStable),
        take(1),
        switchMap(([product, _]) =>
          this.applePayService.start(product as Product)
        )
      )
      .subscribe(
        (val) => {
          console.log('main obs result', val);
        },
        (error) => {
          console.log('main obs', error);
        }
      );
  }
}
