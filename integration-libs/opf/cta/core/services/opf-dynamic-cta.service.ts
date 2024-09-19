/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  ActiveCartFacade,
  Cart,
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  CartUpdateEntrySuccessEvent,
} from '@spartacus/cart/base/root';
import {
  CurrencyService,
  EventService,
  LanguageService,
  Product,
  WindowRef,
} from '@spartacus/core';
import {
  CtaProductItem,
  CtaScriptsLocation,
  CtaScriptsRequest,
  OpfCtaFacade,
} from '@spartacus/opf/cta/root';
import { OpfGlobalFunctionsFacade } from '@spartacus/opf/global-functions/root';
import {
  GlobalFunctionsDomain,
  KeyValuePair,
} from '@spartacus/opf/payment/root';
import { CurrentProductService } from '@spartacus/storefront';
import {
  combineLatest,
  map,
  merge,
  Observable,
  Subscription,
  take,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpfDynamicCtaService {
  protected globalFunctionsFacade = inject(OpfGlobalFunctionsFacade);
  protected winRef = inject(WindowRef);
  protected eventService = inject(EventService);
  protected currencyService = inject(CurrencyService);
  protected languageService = inject(LanguageService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected opfCtaFacade = inject(OpfCtaFacade);
  protected currentProductService = inject(CurrentProductService);

  protected subList: Array<Subscription> = [];
  isOnsiteMessagingInit = false;
  scriptIdentifiers: Array<string> = [];
  isCartPage: boolean;

  fillCtaRequestforCartPage(
    scriptLocation: CtaScriptsLocation,
    paymentAccountIds: number[]
  ) {
    this.isCartPage = true;
    return combineLatest({
      cart: this.activeCartFacade.takeActive(),
      additionalData: this.fillAdditionalData(),
    }).pipe(
      take(1),
      map(({ cart, additionalData }) => {
        return {
          paymentAccountIds: paymentAccountIds,
          scriptLocations: [scriptLocation],
          ctaProductItems: cart.entries?.map((entry) => {
            return {
              productId: entry.product?.code,
              quantity: entry.quantity,
            } as CtaProductItem;
          }),
          additionalData,
        } as CtaScriptsRequest;
      })
    );
  }

  fillCtaRequestforProductPage(
    scriptLocation: CtaScriptsLocation,
    paymentAccountIds: number[]
  ) {
    this.isCartPage = false;
    return combineLatest({
      product: this.currentProductService.getProduct(),
      additionalData: this.fillAdditionalData(),
    }).pipe(
      take(1),
      map(({ product, additionalData }) => {
        return {
          ctaProductItems: [{ productId: product?.code, quantity: 1 }],
          paymentAccountIds: paymentAccountIds,
          scriptLocations: [scriptLocation],
          additionalData,
        } as CtaScriptsRequest;
      })
    );
  }

  protected fillAdditionalData(): Observable<Array<KeyValuePair>> {
    return combineLatest({
      language: this.languageService.getActive(),
      currency: this.currencyService.getActive(),
    }).pipe(
      take(1),
      map(({ language, currency }) => {
        return [
          {
            key: 'locale',
            value: language,
          },
          {
            key: 'currency',
            value: currency,
          },
          {
            key: 'scriptIdentifier',
            value: this.getNewScriptIdentifier(),
          },
        ];
      })
    );
  }

  initiateEvents() {
    if (!this.isOnsiteMessagingInit) {
      this.registerScriptReadyEvent();
      this.listenScriptReadyEvent();

      this.isCartPage && this.cartChangedListener();
      !this.isCartPage && this.productChangedListener();

      this.isOnsiteMessagingInit = true;
    }
  }

  stopEvents() {
    if (this.isOnsiteMessagingInit) {
      this.subList.forEach((sub) => sub.unsubscribe());
      this.subList = [];
      this.globalFunctionsFacade.removeGlobalFunctions(
        GlobalFunctionsDomain.GLOBAL
      );
      this.isOnsiteMessagingInit = false;
    }
  }

  protected getNewScriptIdentifier(): string {
    this.scriptIdentifiers.push(String(this.scriptIdentifiers.length + 1));
    return String(
      this.scriptIdentifiers[this.scriptIdentifiers.length - 1]
    ).padStart(4, '0');
  }

  protected registerScriptReadyEvent() {
    this.globalFunctionsFacade.registerGlobalFunctions({
      paymentSessionId: '',
      domain: GlobalFunctionsDomain.GLOBAL,
    });
  }

  protected listenScriptReadyEvent() {
    const sub = this.opfCtaFacade.listenScriptReadyEvent().subscribe({
      next: (id: string) => {
        this.isCartPage && this.dispatchCartEvents([id]);
        !this.isCartPage && this.dispatchProductEvents([id]);
      },
    });
    this.subList.push(sub);
  }

  protected dispatchCartEvents(scriptIdentifiers: Array<string>): void {
    this.activeCartFacade
      .takeActive()
      .pipe(
        take(1),
        map((cart: Cart) => {
          console.log('flo cart', cart);
          return { total: cart.totalPrice?.value };
        }),
        tap((cartTotalPrice) => {
          const window = this.winRef.nativeWindow as any;
          const dispatchEvent = window?.dispatchEvent;

          console.log('dispatchEvents1');
          if (dispatchEvent) {
            console.log('dispatchEvents2', scriptIdentifiers);
            dispatchEvent(
              new CustomEvent('cartChanged', {
                detail: { cart: cartTotalPrice, scriptIdentifiers },
              })
            );
          }
        })
      )
      .subscribe();
  }

  protected dispatchProductEvents(scriptIdentifiers: Array<string>): void {
    console.log('dispatchProductEvents enter');
    this.currentProductService
      .getProduct()
      .pipe(
        take(1),
        map((product: Product | null) => {
          console.log('flo product', product);
          return [
            {
              price: {
                sellingPrice: product?.price?.value,
              },
              quantity: 1,
            },
          ];
        }),
        tap((productInfo) => {
          const window = this.winRef.nativeWindow as any;
          const dispatchEvent = window?.dispatchEvent;

          console.log('dispatchProductEvents1:', {
            detail: { productInfo, scriptIdentifiers },
          });
          if (dispatchEvent) {
            console.log('dispatchProductEvents2', scriptIdentifiers);
            dispatchEvent(
              new CustomEvent('productTotalAmountChanged', {
                detail: { productInfo, scriptIdentifiers },
              })
            );
          }
        })
      )
      .subscribe();
  }

  productChangedListener(): void {
    //// need event listener detecting pdp counter change event and get its qty value.
  }

  cartChangedListener(): void {
    const sub = merge(
      this.eventService.get(CartUpdateEntrySuccessEvent),
      this.eventService.get(CartAddEntrySuccessEvent),
      this.eventService.get(CartRemoveEntrySuccessEvent)
    ).subscribe({
      next: (
        cartEvent:
          | CartUpdateEntrySuccessEvent
          | CartAddEntrySuccessEvent
          | CartRemoveEntrySuccessEvent
      ) => {
        console.log('CartSuccessEvent', cartEvent);
        this.dispatchCartEvents(this.scriptIdentifiers);
      },
    });
    this.subList.push(sub);
  }
}
