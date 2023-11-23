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
import {
  CTAProductInfo,
  OpfPaymentFacade,
  OrderData,
  PaymentMethod,
} from '@spartacus/opf/base/root';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ApplePayService } from '../../apple-pay/apple-pay.service';
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
  selectedProductInfo$: Observable<Array<CTAProductInfo>>;
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
    this.selectedProductInfo$ = this.selectedProduct$.pipe(
      switchMap((product) => {
        return of(this.generateCtaItems(product as Product));
      })
    );

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
    // this.eventService.dispatch({}, CheckoutQueryResetEvent);
    // this.checkoutDeliveryFacade.resetSetDeliveryAddressProcess();
    // this.checkoutDeliveryFacade.resetSetDeliveryModeProcess();

    // this.subs = this.getDefaultAddressAfterSuccessfulCartEntryAdd()
    //   .pipe(first())
    //   .subscribe((address) => {
    //     console.log('address', address);
    //     this.checkoutDeliveryAddressFacade.setDeliveryAddress(address);
    //   });

    // this.subs = this.getDefaultDeliveryModeAfterSuccessfulAddressSetup()
    //   .pipe(first())
    //   .subscribe((mode) => {
    //     console.log('mode', mode);
    //     this.checkoutDeliveryModesFacade.setDeliveryMode(mode?.code as string);
    //   });

    // this.subs = this.onDeliveryModeSetup()
    //   .pipe(
    //     first(),
    //     switchMap(() => this.quickBuyAfterSettingUpDeliveryMode())
    //   )
    //   .subscribe();

    // this.subs = this.addProductToCart$().subscribe(() => {
    //   console.log('addProductToCart subscribed');
    // });

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

  // private getDefaultAddressAfterSuccessfulCartEntryAdd(): Observable<Address> {
  //   return this.eventService.get(CartAddEntrySuccessEvent).pipe(
  //     // combineLatest([
  //     //   this.userAddressService.getAddresses(),
  //     //   this.userAddressService.getAddressesLoadedSuccess(),
  //     // ]).pipe(
  //     //   debounceTime(0),
  //     //   tap(([, addressesLoadedSuccess]) => {
  //     //     if (!addressesLoadedSuccess) {
  //     //       this.userAddressService.loadAddresses();
  //     //     }
  //     //   }),
  //     //   filter(([, addressesLoadedSuccess]) => addressesLoadedSuccess),
  //     //   switchMap(([addresses]) => addresses[0]))

  //     tap((val) => console.log('flo1', val)),
  //     switchMap(() => this.userAddressService.getAddressesLoadedSuccess()),
  //     debounceTime(0),
  //     tap((addressesLoadedSuccess) => {
  //       if (!addressesLoadedSuccess) {
  //         this.userAddressService.loadAddresses();
  //       }
  //     }),
  //     tap((val) => console.log('flo1.5', val)),
  //     filter((success) => success),
  //     switchMap(() => this.userAddressService.getAddresses()),
  //     tap((val) => console.log('flo2', val)),
  //     map((addresses) => addresses[0])
  //   );
  // }

  // private getDefaultDeliveryModeAfterSuccessfulAddressSetup(): Observable<DeliveryMode> {
  //   return combineLatest([
  //     this.checkoutDeliveryAddressFacade.getDeliveryAddressState(),
  //     this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState(),
  //   ]).pipe(
  //     tap((val) => console.log('flo3', val)),
  //     filter(
  //       ([s1, s2]) => !s1.loading && !s1.error && !s2.loading && !s2.error
  //     ),
  //     switchMap(() =>
  //       this.checkoutDeliveryModesFacade.getSupportedDeliveryModes()
  //     ),
  //     filter((deliveryModes) => !!deliveryModes?.length),
  //     tap((val) => console.log('flo4', val)),
  //     map((modes) => modes[0])
  //   );
  // }

  // private onDeliveryModeSetup(): Observable<any> {
  //   return this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState().pipe(
  //     tap((val) => console.log('flo5', val)),
  //     filter((state) => !state.loading && !state.error),
  //     tap((val) => console.log('flo55', val))
  //   );
  // }

  private generateCtaItems(product: Product): Array<CTAProductInfo> {
    const productItems: Array<CTAProductInfo> = [];
    // each product needs to be it's own item in array
    // qty > 1 needs to be multiple line items in array
    for (let index = 0; index < this.quantity; index++) {
      productItems.push({
        productId: product.code as string,
        quantity: 1,
        price: {
          sellingPrice: product?.price?.value,
        },
      });
    }
    return productItems;
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
        const order: OrderData = {
          orderId: _cartId,
          total: product?.price?.value,
          currency: product?.price?.currencyIso,
          subTotalWithTax: product?.price?.value,
          customerEmail: shippingAddress?.emailAddress,
          totalDiscount: 0,
          shFeeWithTax: 0,
          shFeeTax: 0,
          shippingMethod: {
            id: '1',
            name: 'Direct shipping',
            defaultFlag: false,
          },
          billingAddress: {
            firstName: billingAddress?.givenName,
            lastName: billingAddress?.familyName,
            addressLine1: billingAddress?.addressLines?.[0],
            addressLine2: billingAddress?.addressLines?.[1],
            emailAddress: shippingAddress?.emailAddress,
            city: billingAddress?.locality,
            state: billingAddress?.administrativeArea,
            zip: billingAddress?.postalCode,
            phoneNumber: shippingAddress?.phoneNumber,
            country: billingAddress?.countryCode,
          },
          shippingAddress: {
            firstName: shippingAddress?.givenName,
            lastName: shippingAddress?.familyName,
            addressLine1: shippingAddress?.addressLines?.[0],
            addressLine2: shippingAddress?.addressLines?.[1],
            emailAddress: shippingAddress?.emailAddress,
            city: shippingAddress?.locality,
            state: shippingAddress?.administrativeArea,
            zip: shippingAddress?.postalCode,
            phoneNumber: shippingAddress?.phoneNumber,
            country: shippingAddress?.countryCode,
          },
          orderLines: [
            {
              lineTax: 0,
              lineShFeeTaxPercent: 0,
              productId: product?.code,
              copyProduct: {
                name: product?.name,
                price: product?.price?.value,
              },
              quantity: 1,
              unitPriceWithTax: product?.price?.value,
              lineTaxPercent: 0,
              lineSubTotalWithTax: product?.price?.value,
              productName: product?.name,
              productDescription: product?.description,
              lineTotal: product?.price?.value,
              deliveryMethod: 'SFDC',
              lineTotalDiscount: 0,
            },
          ],
        };

        console.log('order Info', order);

        const encryptedToken = btoa(
          JSON.stringify(applePayPayment.token.paymentData)
        );
        console.log('flo8', encryptedToken);

        return this.opfPaymentFacade.submitPayment({
          additionalData: [],
          paymentSessionId: '',
          cartId: order.orderId,
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
      // switchMap(() =>
      //   this.checkoutDeliveryAddressFacade.clearCheckoutDeliveryAddress()
      // ),
      switchMap((address) => {
        console.log('stored address', address);
        _shippingAddress.id = _address.id;
        return this.checkoutDeliveryAddressFacade.createAndSetAddress(
          _shippingAddress
        );
      }),
      tap((value) => console.log('setDeliveryAddress', value))
      // switchMap(() =>
      //   this.checkoutBillingAddressFacade.setBillingAddress(_billingAddress)
      // ),
      // tap(() => console.log('setBillingAddress'))
    );

    //  return  this.checkoutBillingAddressFacade.setBillingAddress(_billingAddress)
  }

  // private quickBuyAfterSettingUpDeliveryMode(): Observable<any> {
  //   console.log('quickBuyAfterSettingUpDeliveryMode');
  //   return combineLatest([
  //     this.selectedProduct$,
  //     this.activeCartService.getActiveCartId(),
  //     this.activeCartService.isStable(),
  //   ]).pipe(
  //     tap((val) => console.log('flo6', val)),
  //     filter(
  //       ([_, cartId, isStable]) =>
  //         isStable && cartId !== undefined && cartId !== null && cartId !== ''
  //     ),
  //     switchMap(([product, cartId, _]) => {
  //       console.log('Preparing opf order', product, this.applePayPayment);
  //       if (!this.applePayPayment) {
  //         return of({});
  //       }
  //       const billingAddress = this.applePayPayment.billingContact;
  //       const shippingAddress = this.applePayPayment.shippingContact;
  //       console.log('Billing', billingAddress);
  //       console.log('Shipping', shippingAddress);
  //       const order: OrderData = {
  //         orderId: cartId,
  //         total: product?.price?.value,
  //         currency: product?.price?.currencyIso,
  //         subTotalWithTax: product?.price?.value,
  //         customerEmail: shippingAddress?.emailAddress,
  //         totalDiscount: 0,
  //         shFeeWithTax: 0,
  //         shFeeTax: 0,
  //         shippingMethod: {
  //           id: '1',
  //           name: 'Direct shipping',
  //           defaultFlag: false,
  //         },
  //         billingAddress: {
  //           firstName: billingAddress?.givenName,
  //           lastName: billingAddress?.familyName,
  //           addressLine1: billingAddress?.addressLines?.[0],
  //           addressLine2: billingAddress?.addressLines?.[1],
  //           emailAddress: shippingAddress?.emailAddress,
  //           city: billingAddress?.locality,
  //           state: billingAddress?.administrativeArea,
  //           zip: billingAddress?.postalCode,
  //           phoneNumber: shippingAddress?.phoneNumber,
  //           country: billingAddress?.countryCode,
  //         },
  //         shippingAddress: {
  //           firstName: shippingAddress?.givenName,
  //           lastName: shippingAddress?.familyName,
  //           addressLine1: shippingAddress?.addressLines?.[0],
  //           addressLine2: shippingAddress?.addressLines?.[1],
  //           emailAddress: shippingAddress?.emailAddress,
  //           city: shippingAddress?.locality,
  //           state: shippingAddress?.administrativeArea,
  //           zip: shippingAddress?.postalCode,
  //           phoneNumber: shippingAddress?.phoneNumber,
  //           country: shippingAddress?.countryCode,
  //         },
  //         orderLines: [
  //           {
  //             lineTax: 0,
  //             lineShFeeTaxPercent: 0,
  //             productId: product?.code,
  //             copyProduct: {
  //               name: product?.name,
  //               price: product?.price?.value,
  //             },
  //             quantity: 1,
  //             unitPriceWithTax: product?.price?.value,
  //             lineTaxPercent: 0,
  //             lineSubTotalWithTax: product?.price?.value,
  //             productName: product?.name,
  //             productDescription: product?.description,
  //             lineTotal: product?.price?.value,
  //             deliveryMethod: 'SFDC',
  //             lineTotalDiscount: 0,
  //           },
  //         ],
  //       };

  //       const encryptedToken = btoa(
  //         JSON.stringify(this.applePayPayment.token.paymentData)
  //       );
  //       console.log('flo8');

  //       return this.opfPaymentFacade.submitPayment({
  //         additionalData: [],
  //         paymentSessionId: '',
  //         cartId: order.orderId,
  //         callbackArray: [() => {}, () => {}, () => {}],

  //         paymentMethod: PaymentMethod.APPLE_PAY,
  //         encryptedToken: encryptedToken,
  //       });
  //     })
  //   );
  // }
}
