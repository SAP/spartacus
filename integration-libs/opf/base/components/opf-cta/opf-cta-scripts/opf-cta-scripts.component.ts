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
import {
  Address,
  EventService,
  Product,
  UserAddressService,
} from '@spartacus/core';
import { OpfPaymentFacade, PaymentMethod } from '@spartacus/opf/base/root';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

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

  addProductToCart$() {
    return this.selectedProduct$.pipe(
      take(1),
      tap((product) => {
        this.activeCartService.addEntry(product?.code as string, 1);
      })
    );
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
        ),

        tap(({ payment, product }) => {
          // console.log('Added product to cart', payment, product);
          this.applePayPayment = payment;
          //  this.activeCartService.addEntry(product?.code as string, 1);

          this.placeOrderAfterPayment(product, payment).subscribe(
            (val) => {
              console.log(val);
            },
            (error) => {
              console.log(error);
            }
          );
        })
      )
      .subscribe(
        (val) => {
          console.log('main obs', val);
        },
        (error) => {
          console.log('main obs', error);
        }
      );
  }

  private placeOrderAfterPayment(
    product: Product,
    applePayPayment: ApplePayJS.ApplePayPayment
  ) {
    let _cartId = '';
    console.log('placeOrderAfterPayment');
    return combineLatest([
      this.activeCartService.getActiveCartId(),
      this.activeCartService.isStable(),
    ]).pipe(
      filter(([_, isStable]) => !!isStable),
      take(1),
      switchMap(([cartId, _]) => {
        _cartId = cartId;

        return this.fillCartAddresses(
          applePayPayment.billingContact,
          applePayPayment.shippingContact
        );
      }),
      tap(() => {
        this.activeCartService
          .getActive()
          .pipe(take(1))
          .subscribe((cart) => {
            console.log('final cart', cart);
          });
      }),
      switchMap(() => {
        console.log('Preparing opf order', product, applePayPayment);
        if (!applePayPayment) {
          return of({});
        }

        const billingAddress = applePayPayment.billingContact;
        const shippingAddress = applePayPayment.shippingContact;
        console.log('Billing', billingAddress);
        console.log('Shipping', shippingAddress);

        const encryptedToken = btoa(
          JSON.stringify(applePayPayment.token.paymentData)
        );
        console.log('flo8', encryptedToken);

        return this.opfPaymentFacade.submitPayment({
          additionalData: [],
          paymentSessionId: '',
          cartId: _cartId,
          callbackArray: [() => {}, () => {}, () => {}],

          paymentMethod: PaymentMethod.APPLE_PAY,
          encryptedToken: encryptedToken,
        });
      })
    );
  }

  protected fillCartAddresses(
    billingAddress: ApplePayJS.ApplePayPaymentContact | undefined,
    shippingAddress: ApplePayJS.ApplePayPaymentContact | undefined
  ): Observable<unknown> {
    console.log('fillCartAddresses');

    const _billingAddress: Address = {
      firstName: billingAddress?.givenName,
      lastName: billingAddress?.familyName,
      line1: billingAddress?.addressLines?.[0],
      line2: billingAddress?.addressLines?.[1],
      email: shippingAddress?.emailAddress,
      town: billingAddress?.locality,
      district: billingAddress?.administrativeArea,
      postalCode: billingAddress?.postalCode,
      phone: shippingAddress?.phoneNumber,
      country: {
        isocode: billingAddress?.countryCode,
        name: billingAddress?.country,
      },
      defaultAddress: true,
    };
    const _shippingAddress: Address = {
      id: '',
      firstName: shippingAddress?.givenName,
      lastName: shippingAddress?.familyName,
      line1: shippingAddress?.addressLines?.[0],
      line2: shippingAddress?.addressLines?.[1],
      email: shippingAddress?.emailAddress,
      town: shippingAddress?.locality,
      district: shippingAddress?.administrativeArea,
      postalCode: shippingAddress?.postalCode,
      phone: shippingAddress?.phoneNumber,
      country: {
        isocode: shippingAddress?.countryCode,
        name: shippingAddress?.country,
      },
      defaultAddress: true,
    };
    console.log(
      '_shippingAddress',
      _shippingAddress,
      '_billingAddress',
      _billingAddress
    );
    let _address: Address;
    return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(
      filter((state) => !state.loading),
      take(1),
      map((state) => {
        _address = state.data as Address;
        return state.data;
      }),

      switchMap(() => {
        console.log('stored address');
        _shippingAddress.id = _address.id;
        this.userAddressService.updateUserAddress(
          _address.id as string,
          _shippingAddress
        );
        return of({});
      }),
      switchMap(() =>
        this.checkoutDeliveryAddressFacade.getDeliveryAddressState()
      ),
      filter((state) => !state.loading),
      take(1),
      map((state) => {
        _address = state.data as Address;
        return state.data;
      }),
      tap((value) => console.log('setDeliveryAddress2', value))
    );
  }
}
