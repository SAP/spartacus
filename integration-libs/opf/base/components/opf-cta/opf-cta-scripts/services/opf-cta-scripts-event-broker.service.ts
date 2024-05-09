import { Injectable, inject } from '@angular/core';
import {
  ActiveCartFacade,
  Cart,
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  CreateCartEvent,
} from '@spartacus/cart/base/root';
import { EventService, WindowRef } from '@spartacus/core';
import { ProductQuantityChangedEvent } from '@spartacus/storefront';
import { Subject, merge, switchMap, takeUntil } from 'rxjs';
import { OpfScriptIdentifierService } from './opf-cta-scripts-identifier.service';

@Injectable()
export class OpfCtaScriptEventBrokerService {
  protected destroy$ = new Subject<void>();

  protected eventService = inject(EventService);
  protected winRef = inject(WindowRef);
  protected scriptIdentifierService = inject(OpfScriptIdentifierService);
  protected activeCartService = inject(ActiveCartFacade);

  public listenOnRelevantEvents() {
    this.onCartChanged();
    this.onQuantityChanged();
  }

  public removeListeners(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onCartChanged(): void {
    // ADD SCRIPT READY EVENT // SHOULD IT WORK ON PDP? PROBABLY NOT
    merge(
      this.eventService.get(CartAddEntrySuccessEvent),
      this.eventService.get(CartRemoveEntrySuccessEvent),
      this.eventService.get(CreateCartEvent)
    )
      .pipe(
        switchMap(() => this.activeCartService.getActive()),
        takeUntil(this.destroy$)
      )
      .subscribe((cart: Cart) => {
        this.dispatchCartChangedEvent(cart.totalUnitCount);
      });
  }

  protected onQuantityChanged(): void {
    // ADD SCRIPT READY EVENT
    this.eventService
      .get(ProductQuantityChangedEvent)
      .pipe(takeUntil(this.destroy$))
      .subscribe((eventDetails: ProductQuantityChangedEvent) =>
        this.dispatchProductAmountChangedEvent(eventDetails.quantity)
      );
  }

  protected dispatchProductAmountChangedEvent(totalAmount: number): void {
    const dispatchEvent = this.winRef?.nativeWindow?.dispatchEvent;
    console.log('dispatchProductAmountChangedEvent', totalAmount);
    if (dispatchEvent) {
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
    console.log('dispatchCartChangedEvent');
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
