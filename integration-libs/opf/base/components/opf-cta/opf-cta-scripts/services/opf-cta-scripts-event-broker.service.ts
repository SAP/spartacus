import { Injectable, inject } from '@angular/core';
import {
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  CreateCartEvent,
} from '@spartacus/cart/base/root';
import { EventService, WindowRef } from '@spartacus/core';
import { ProductQuantityChangedEvent } from '@spartacus/storefront';
import { Subject, merge, takeUntil } from 'rxjs';

@Injectable()
export class OpfCtaScriptEventBrokerService {
  protected destroy$ = new Subject<void>();

  protected eventService = inject(EventService);
  protected winRef = inject(WindowRef);

  public listenOnRelevantEvents() {
    this.onCartChanged();
    this.onQuantityChanged();
  }

  public removeListeners(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onCartChanged(): void {
    merge(
      this.eventService.get(CartAddEntrySuccessEvent),
      this.eventService.get(CartRemoveEntrySuccessEvent),
      this.eventService.get(CreateCartEvent)
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => this.dispatchCartChangedEvent(val));
  }

  protected onQuantityChanged(): void {
    this.eventService
      .get(ProductQuantityChangedEvent)
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => this.dispatchProductAmountChangedEvent(val));
  }

  protected dispatchProductAmountChangedEvent(value: any): void {
    const dispatchEvent = this.winRef?.nativeWindow?.dispatchEvent;
    console.log(value);

    if (dispatchEvent) {
      dispatchEvent(
        new CustomEvent('productTotalAmountChanged', {
          // detail: {
          //   productInfo: this.productItems?.map((item) => ({
          //     ...item,
          //     fulfillmentLocationId:
          //       this.fulfillmentLocation?.fulfillmentLocationId,
          //   })),
          //   scriptIdentifiers,
          // },
        })
      );
    }
  }

  protected dispatchCartChangedEvent(value: any): void {
    const dispatchEvent = this.winRef?.nativeWindow?.dispatchEvent;
    console.log(value);

    if (dispatchEvent) {
      dispatchEvent(
        new CustomEvent('cartChanged', {
          // detail: { cart: this.cart, scriptIdentifiers },
        })
      );
    }
  }
}
