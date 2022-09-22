import { Component } from '@angular/core';
import { Product } from '@spartacus/core';
import { ICON_TYPE, ModalService } from '@spartacus/storefront';

@Component({
  selector: 'cx-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
})
export class ProductDetailsDialogComponent {
  iconTypes = ICON_TYPE;

  product: Product;
  select: Function;

  constructor(protected modalService: ModalService) {}

  selectProduct() {
    this.select();
    this.dismissModal();
  }

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }
}
