import { Injectable, OnDestroy } from '@angular/core';
import {
  CartAddEntryFailEvent,
  CartUiEventAddToCart,
} from '@spartacus/cart/base/root';
import { EventService } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER, ModalRef, ModalService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddedToCartDialogEventListener implements OnDestroy {
  protected subscription = new Subscription();

  protected modalRef: ModalRef;

  constructor(
    protected eventService: EventService,
    protected modalService: ModalService,
    protected launchDialogService: LaunchDialogService
  ) {
    this.onAddToCart();
  }

  protected onAddToCart() {
    this.subscription.add(
      this.eventService.get(CartUiEventAddToCart).subscribe((event) => {
        this.openModal(event);
      })
    );

    this.subscription.add(
      this.eventService.get(CartAddEntryFailEvent).subscribe(() => {
        this.closeModal();
      })
    );
  }

  protected openModal(event: CartUiEventAddToCart): void {
    let data = {
      productCode: event.productCode,
      quantity: event.quantity,
      numberOfEntriesBeforeAdd: event.numberOfEntriesBeforeAdd
    };
    console.log(event.numberOfEntriesBeforeAdd);
    const dialog = this.launchDialogService.openDialog(LAUNCH_CALLER.ADDED_TO_CART, undefined, event.vcr, data);
    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  protected closeModal(): void {
    this.launchDialogService.closeDialog("Cross click");
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
