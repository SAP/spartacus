/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { OpfKeyValueMap } from '@spartacus/opf/base/root';
import {
  OpfCtaEvent,
  OpfCtaFacade,
  OpfCtaProductItem,
  OpfCtaScriptsLocation,
  OpfCtaScriptsRequest,
} from '@spartacus/opf/cta/root';
import {
  OpfGlobalFunctionsDomain,
  OpfGlobalFunctionsFacade,
} from '@spartacus/opf/global-functions/root';

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

@Injectable()
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
  protected isOnsiteMessagingInit = false;
  protected scriptIdentifiers: Array<string> = [];
  protected isCartPage: boolean;

  fillCtaRequestforCartPage(
    scriptLocation: OpfCtaScriptsLocation,
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
            } as OpfCtaProductItem;
          }),
          additionalData,
        } as OpfCtaScriptsRequest;
      })
    );
  }

  fillCtaRequestforProductPage(
    scriptLocation: OpfCtaScriptsLocation,
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
        } as OpfCtaScriptsRequest;
      })
    );
  }

  protected fillAdditionalData(): Observable<Array<OpfKeyValueMap>> {
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
      this.globalFunctionsFacade.unregisterGlobalFunctions(
        OpfGlobalFunctionsDomain.GLOBAL
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

  registerScriptReadyEvent() {
    this.globalFunctionsFacade.registerGlobalFunctions({
      paymentSessionId: '',
      domain: OpfGlobalFunctionsDomain.GLOBAL,
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
          return { total: cart.totalPrice?.value };
        }),
        tap((cartTotalPrice) => {
          const window = this.winRef.nativeWindow;
          const dispatchEvent = window?.dispatchEvent;
          if (dispatchEvent) {
            dispatchEvent(
              new CustomEvent(OpfCtaEvent.OPF_CART_CHANGED, {
                detail: { cart: cartTotalPrice, scriptIdentifiers },
              })
            );
          }
        })
      )
      .subscribe();
  }

  protected dispatchProductEvents(
    scriptIdentifiers: Array<string>,
    quantity = 1
  ): void {
    this.currentProductService
      .getProduct()
      .pipe(
        take(1),
        map((product: Product | null) => {
          return [
            {
              price: {
                sellingPrice: product?.price?.value,
              },
              quantity, // hard-coded until 'pdp counter change' event gets implemented
            },
          ];
        }),
        tap((productInfo) => {
          const window = this.winRef.nativeWindow as any;
          const dispatchEvent = window?.dispatchEvent;
          if (dispatchEvent) {
            dispatchEvent(
              new CustomEvent(OpfCtaEvent.OPF_PRODUCT_AMOUNT_CHANGED, {
                detail: { productInfo, scriptIdentifiers },
              })
            );
          }
        })
      )
      .subscribe();
  }

  protected productChangedListener(): void {
    //// need event listener detecting 'pdp counter changed' event and get its qty value.
  }

  protected cartChangedListener(): void {
    const sub = merge(
      this.eventService.get(CartUpdateEntrySuccessEvent),
      this.eventService.get(CartAddEntrySuccessEvent),
      this.eventService.get(CartRemoveEntrySuccessEvent)
    ).subscribe({
      next: () => {
        this.dispatchCartEvents(this.scriptIdentifiers);
      },
    });
    this.subList.push(sub);
  }
}
