import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CartService, OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  ModalRef,
  ModalService,
} from '../../../../shared/components/modal/index';
import { AddToCartComponent } from '../../add-to-cart/add-to-cart.component';

export interface Item {
  product?: any;
  quantity?: any;
  basePrice?: any;
  totalPrice?: any;
  updateable?: boolean;
}

@Component({
  selector: 'cx-cart-item',
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent implements OnInit {
  @Input()
  compact = false;
  @Input()
  item: Item;
  @Input()
  potentialProductPromotions: any[];
  @Input()
  isReadOnly = false;
  @Input()
  cartIsLoading = false;

  @Output()
  remove = new EventEmitter<any>();
  @Output()
  update = new EventEmitter<any>();
  @Output()
  view = new EventEmitter<any>();

  @Input()
  parent: FormGroup;

  cartEntry$: Observable<OrderEntry>;

  modalRef: ModalRef;

  constructor(
    cartService: CartService,
    protected modalService: ModalService,
    cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  isProductOutOfStock(product) {
    // TODO Move stocklevelstatuses across the app to an enum
    return (
      product &&
      product.stock &&
      product.stock.stockLevelStatus === 'outOfStock'
    );
  }

  private openModal(): void {
    let modalInstance: any;

    this.modalRef = this.modalService.open(AddToCartComponent, {
      centered: true,
      size: 'lg',
    });

    modalInstance = this.modalRef.componentInstance;
    modalInstance.entry$ = this.cartEntry$;
    // modalInstance.cart$ = this.cartService.getActive();
    // modalInstance.loaded$ = this.cartService.getLoaded();
    // modalInstance.quantity = this.quantity;
    // modalInstance.increment = this.increment;
  }

  updateItem(updatedQuantity: number) {
    this.update.emit({ item: this.item, updatedQuantity });
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  viewItem() {
    this.view.emit();
  }
}
