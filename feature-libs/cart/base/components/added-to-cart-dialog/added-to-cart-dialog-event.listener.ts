import { Injectable, OnDestroy } from '@angular/core';
import {
  CartAddEntryFailEvent,
  CartUiEventAddToCart,
} from '@spartacus/cart/base/root';
import { EventService } from '@spartacus/core';
import { ModalRef, ModalService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { AddedToCartDialogComponent } from './added-to-cart-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AddedToCartDialogEventListener implements OnDestroy {
  protected subscription = new Subscription();

  protected modalRef: ModalRef;

  constructor(
    protected eventService: EventService,
    protected modalService: ModalService
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
      this.eventService.get(CartAddEntryFailEvent).subscribe((event) => {
        this.closeModal(event);
      })
    );
  }

  protected openModal(event: CartUiEventAddToCart): void {
    this.modalRef = this.modalService.open(AddedToCartDialogComponent, {
      centered: true,
      size: 'lg',
    });
    const modalInstance = this.modalRef.componentInstance;
    modalInstance.init(
      event.productCode,
      event.quantity,
      event.numberOfEntriesBeforeAdd
    );
  }

  protected closeModal(event: CartAddEntryFailEvent): void {
    if (this.modalService.getActiveModal() === this.modalRef) {
      const modalInstance = this.modalRef.componentInstance;
      modalInstance.dismissModal(event.error);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
