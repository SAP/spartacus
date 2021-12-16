import { Injectable, OnDestroy } from '@angular/core';
import {
  ActiveCartFacade,
  CartAddEntrySuccessEvent,
} from '@spartacus/cart/main/root';
import { EventService } from '@spartacus/core';
import { ModalRef, ModalService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AddedToCartDialogComponent } from '../cart/add-to-cart/added-to-cart-dialog/added-to-cart-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class CartComponentEventListener implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected eventService: EventService,
    protected modalService: ModalService
  ) {
    this.onAddToCart();
  }

  protected onAddToCart() {
    this.subscription.add(
      this.eventService.get(CartAddEntrySuccessEvent).subscribe((event) => {
        console.log(`CartAddEntrySuccessEvent`, event);
        this.openModal(event);
      })
    );
  }
  protected openModal(event: CartAddEntrySuccessEvent) {
    let modalRef: ModalRef;

    let modalInstance: any;
    modalRef = this.modalService.open(AddedToCartDialogComponent, {
      centered: true,
      size: 'lg',
    });
    modalInstance = modalRef.componentInstance;
    // Display last entry for new product code. This always corresponds to
    // our new item, independently of whether merging occured or not
    modalInstance.entry$ = this.activeCartFacade.getLastEntry(
      event.productCode //this.productCode
    );
    modalInstance.cart$ = this.activeCartFacade.getActive();
    modalInstance.loaded$ = this.activeCartFacade.isStable();
    modalInstance.quantity = event.quantityAdded; // this.quantity;
    //modalInstance.numberOfEntriesBeforeAdd = 0; // this.numberOfEntriesBeforeAdd;
    modalInstance.addedEntryWasMerged$ = this.activeCartFacade
      .getEntry(event.productCode)
      .pipe(
        take(1),
        map((entry) => entry?.quantity !== event.quantity)
      );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
