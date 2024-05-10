import { Injectable, inject } from '@angular/core';
import {
  ActiveCartFacade,
  Cart,
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  CreateCartEvent,
} from '@spartacus/cart/base/root';
import { EventService, RoutingService, WindowRef } from '@spartacus/core';
import { ProductQuantityChangedEvent } from '@spartacus/storefront';
import {
  Subject,
  combineLatest,
  merge,
  startWith,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { ScriptReadyNotificationService } from '../../../../core/facade/script-ready-notification.service';
import { OpfScriptIdentifierService } from './opf-cta-scripts-identifier.service';

@Injectable()
export class OpfCtaScriptEventBrokerService {
  protected destroy$ = new Subject<void>();

  protected eventService = inject(EventService);
  protected winRef = inject(WindowRef);
  protected scriptIdentifierService = inject(OpfScriptIdentifierService);
  protected activeCartService = inject(ActiveCartFacade);
  protected scriptReadyNotificationService = inject(
    ScriptReadyNotificationService
  );
  protected routingService = inject(RoutingService);

  public listenOnRelevantEvents() {
    this.routingService
      .getRouterState()
      .pipe(take(1))
      .subscribe((route) => this.callProperListener(route.state.semanticRoute));
  }

  public removeListeners(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected callProperListener(semanticRoute: string | undefined): void {
    switch (semanticRoute) {
      case 'product':
        this.onQuantityChanged();
        break;
      case 'cart':
        this.onCartChanged();
        break;
      default:
        return;
    }
  }

  protected onCartChanged(): void {
    const cartEvents = merge(
      this.eventService.get(CartAddEntrySuccessEvent),
      this.eventService.get(CartRemoveEntrySuccessEvent),
      this.eventService.get(CreateCartEvent)
    ).pipe(startWith({})); // StartWith operator with {} could be not ideal

    combineLatest([
      cartEvents,
      this.scriptReadyNotificationService.scriptReady$,
    ])
      .pipe(
        switchMap(() => this.activeCartService.getActive()),
        takeUntil(this.destroy$)
      )
      .subscribe((cart: Cart) => {
        console.log(cart);
        this.dispatchCartChangedEvent(cart.totalUnitCount);
      });
  }

  protected onQuantityChanged(): void {
    combineLatest([
      this.eventService.get(ProductQuantityChangedEvent),
      this.scriptReadyNotificationService.scriptReady$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([eventDetails, _]: [ProductQuantityChangedEvent, void]) =>
        this.dispatchProductAmountChangedEvent(eventDetails.quantity)
      );
  }

  protected dispatchProductAmountChangedEvent(totalAmount: number): void {
    const dispatchEvent = this.winRef?.nativeWindow?.dispatchEvent;
    console.log('dispatchProductAmountChangedEvent', totalAmount);
    if (dispatchEvent && totalAmount) {
      dispatchEvent(
        new CustomEvent('productTotalAmountChanged', {
          detail: {
            totalAmount,
            scriptIdentifiers:
              this.scriptIdentifierService.allScriptIdentifiers,
          },
        })
      );
    }
  }

  protected dispatchCartChangedEvent(totalAmount: number | undefined): void {
    const dispatchEvent = this.winRef?.nativeWindow?.dispatchEvent;
    console.log('dispatchCartChangedEvent', totalAmount);
    if (dispatchEvent && totalAmount) {
      dispatchEvent(
        new CustomEvent('cartChanged', {
          detail: {
            totalAmount,
            scriptIdentifiers:
              this.scriptIdentifierService.allScriptIdentifiers,
          },
        })
      );
    }
  }
}
