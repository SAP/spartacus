import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';

import { CartService } from '@spartacus/core';

import { AddedToCartDialogComponent } from './added-to-cart-dialog/added-to-cart-dialog.component';

@Component({
  selector: 'cx-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToCartComponent implements OnInit {
  modalInstance;

  @Input()
  iconOnly;

  @Input()
  productCode;
  @Input()
  quantity = 1;

  cartEntry$: Observable<any>;
  loaded$: Observable<boolean>;

  constructor(
    protected cartService: CartService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    if (this.productCode) {
      this.loaded$ = this.cartService.loaded$;
      this.cartEntry$ = this.cartService.getEntry(this.productCode);
    }
  }

  addToCart() {
    if (!this.productCode || this.quantity <= 0) {
      return;
    }
    this.openModal();
    this.cartService.addCartEntry(this.productCode, this.quantity);
  }

  private openModal() {
    this.modalInstance = this.modalService.open(AddedToCartDialogComponent, {
      centered: true,
      size: 'lg'
    }).componentInstance;
    this.modalInstance.entry$ = this.cartEntry$;
    this.modalInstance.cart$ = this.cartService.activeCart$;
    this.modalInstance.loaded$ = this.loaded$;
    this.modalInstance.quantity = this.quantity;
  }
}
