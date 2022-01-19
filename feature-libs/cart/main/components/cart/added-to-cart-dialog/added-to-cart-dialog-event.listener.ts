import { Injectable, OnDestroy } from '@angular/core';
import { CartUiEventAddToCart } from '@spartacus/cart/main/root';
import { EventService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { AddedToCartDialogComponent } from './added-to-cart-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AddedToCartDialogEventListener implements OnDestroy {
  protected subscription = new Subscription();

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
  }

  protected openModal(event: CartUiEventAddToCart): void {
    const modalRef = this.modalService.open(AddedToCartDialogComponent, {
      centered: true,
      size: 'lg',
    });
    const modalInstance = modalRef.componentInstance;
    modalInstance.init(
      event.productCode,
      event.quantity,
      event.numberOfEntriesBeforeAdd
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
