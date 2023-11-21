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

import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
} from '@spartacus/checkout/base/root';
import { EventService, Product, UserAddressService } from '@spartacus/core';
import {
  CTAProductInfo,
  OpfPaymentFacade,
  OrderData,
  PaymentMethod,
} from '@spartacus/opf/base/root';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
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
  protected multiCartService = inject(MultiCartFacade);
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
        )
      )
      .subscribe({
        next: ({ payment, product, cartId }) => {
          console.log('next', payment, product);
          this.placeOrderAfterPayment(product, payment, cartId).subscribe(
            (val) => {
              console.log(val);
            },
            (error) => {
              console.log('error', error);
            }
          );
        },
        complete: () => {
          console.log('complete');
        },
        error: (error) => {
          console.log('error sub:', error);
        },
      });
  }

  // protected completePayment(payment:ApplePayJS.ApplePayPayment,product:Product){

  // }

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
    applePayPayment: ApplePayJS.ApplePayPayment,
    cartId: string
  ) {
    console.log('placeOrderAfterPayment', cartId);
    return combineLatest([
      this.multiCartService.getCart(cartId),
      this.multiCartService.isStable(cartId),
    ]).pipe(
      filter(([_, isStable]) => !!isStable),
      take(1),
      tap(([cart, _]) => console.log('final cart', cart)),
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
          orderId: cartId,
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

        console.log('order Info');

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

  // private quickBuyAfterSettingUpDeliveryMode(
  //   applePayPayment: ApplePayJS.ApplePayPayment
  // ): Observable<any> {
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
  //     take(1),
  //     tap(() => {
  //       this.activeCartService.getActive().subscribe((cart) => {
  //         console.log('cart object', cart);
  //       });
  //     }),
  //     switchMap(([product, cartId, _]) => {
  //       console.log('Preparing opf order', product, applePayPayment);
  //       if (!applePayPayment) {
  //         return of({});
  //       }

  //       const billingAddress = applePayPayment.billingContact;
  //       const shippingAddress = applePayPayment.shippingContact;
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

  //       console.log('order Info');

  //       const encryptedToken = btoa(
  //         JSON.stringify(applePayPayment.token.paymentData)
  //       );
  //       console.log('flo8', encryptedToken);

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
