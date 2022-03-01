import { Injectable, OnDestroy } from '@angular/core';
import {
  CartAddEntryFailEvent,
  CartConfig,
  CartUiEventAddToCart,
} from '@spartacus/cart/base/root';
import { EventService } from '@spartacus/core';
import { ModalRef, ModalService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { ADD_TO_CART_FEEDBACK } from '../../root/config/add-to-cart-feedback';
import { AddedToCartDialogComponent } from './added-to-cart-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AddedToCartDialogEventListener implements OnDestroy {
  protected subscription = new Subscription();

  protected modalRef: ModalRef;

  constructor(
    protected eventService: EventService,
    protected modalService: ModalService,
    protected cartConfig: CartConfig
  ) {
    this.onAddToCart();
  }

  protected onAddToCart() {
    const feedbackType = this.cartConfig.cart?.addToCartFeedback.feedback;
    if (feedbackType !== ADD_TO_CART_FEEDBACK.MODAL) {
      return;
    }

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
