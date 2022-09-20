import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  ActiveCartFacade,
  Cart,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { Product } from '@spartacus/core';
import { ICON_TYPE, ModalService } from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
})
export class ProductDetailsDialogComponent {
  iconTypes = ICON_TYPE;

  entry$: Observable<OrderEntry | undefined>;
  cart$: Observable<Cart> = this.activeCartFacade.getActive();
  loaded$: Observable<boolean> = this.activeCartFacade.isStable();
  addedEntryWasMerged$: Observable<boolean>;
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
  product: Product;
  select: Function;

  quantity = 0;
  modalIsOpen = false;

  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;

  constructor(
    protected modalService: ModalService,
    protected activeCartFacade: ActiveCartFacade
  ) {}

  selectProduct() {
    this.select();
    this.dismissModal();
  }

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }
}
