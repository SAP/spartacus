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
  WindowRef,
} from '@spartacus/core';
import {
  CtaProductItem,
  CtaScriptsLocation,
  CtaScriptsRequest,
  OpfCtaFacade,
} from '@spartacus/opf/cta/root';
import { OpfGlobalFunctionsFacade } from '@spartacus/opf/global-functions/root';
import { GlobalFunctionsDomain } from '@spartacus/opf/payment/root';
import { combineLatest, map, merge, Subscription, take, tap } from 'rxjs';

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

  protected subList: Array<Subscription> = [];
  isOnsiteMessagingInit = false;
  scriptIdentifiers: Array<string> = [];

  fillCtaRequestforCartPage(
    scriptLocation: CtaScriptsLocation,
    paymentAccountIds: number[]
  ) {
    return combineLatest({
      cart: this.activeCartFacade.takeActive(),
      language: this.languageService.getActive(),
      currency: this.currencyService.getActive(),
    }).pipe(
      take(1),
      map(({ cart, language, currency }) => {
        return {
          paymentAccountIds: paymentAccountIds,
          scriptLocations: [scriptLocation],
          ctaProductItems: cart.entries?.map((entry) => {
            return {
              productId: entry.product?.code,
              quantity: entry.quantity,
            } as CtaProductItem;
          }),
          additionalData: [
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
          ],
        } as CtaScriptsRequest;
      })
    );
  }

  initiateEvents() {
    if (!this.isOnsiteMessagingInit) {
      this.registerScriptReadyEvent();
      this.listenScriptReadyEvent();
      this.cartChangedListener();
      this.isOnsiteMessagingInit = true;
    }
  }

  stopEvents() {
    if (this.isOnsiteMessagingInit) {
      this.subList.forEach((sub) => sub.unsubscribe());
      this.subList = [];
      // this.globalFunctionsFacade.removeGlobalFunctions(
      //   GlobalFunctionsDomain.GLOBAL
      // );
      this.isOnsiteMessagingInit = false;
    }
  }

  protected removeScriptTags(htmls: string[]) {
    return htmls.map((html) => {
      const element = new DOMParser().parseFromString(html, 'text/html');
      Array.from(element.getElementsByTagName('script')).forEach((script) => {
        html = html.replace(script.outerHTML, '');
      });
      return html;
    });
  }

  protected getNewScriptIdentifier(): string {
    this.scriptIdentifiers.push(String(this.scriptIdentifiers.length));
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
    console.log('listenScriptEvent1');
    const sub = this.opfCtaFacade.listenScriptReadyEvent().subscribe({
      next: (id: string) => {
        console.log('listenScriptReadyEvent next', id);
        this.dispatchEvents([id]);
      },
      error: (error: any) => {
        console.log('listenScriptReadyEvent error', error);
      },
      complete: () => {
        console.log('listenScriptReadyEvent completed:');
      },
    });
    this.subList.push(sub);
  }

  protected dispatchEvents(scriptIdentifiers: Array<string>): void {
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
      .subscribe({
        complete: () => {
          console.log('dispatchEvents sub completed:');
        },
      });
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
        this.dispatchEvents(this.scriptIdentifiers);
      },
      error: (error) => {
        console.log('CartSuccessEvent error:', error);
      },
      complete: () => {
        console.log('CartSuccessEvent completed:');
      },
    });
    this.subList.push(sub);
  }
}
