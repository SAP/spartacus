import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  AuthService,
  RoutingService,
  AuthRedirectService,
} from '@spartacus/core';

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
  @Input()
  enableSaveForLater = false;

  @Output()
  remove = new EventEmitter<any>();
  @Output()
  update = new EventEmitter<any>();
  @Output()
  view = new EventEmitter<any>();
  @Output()
  saveForLater = new EventEmitter<any>();

  @Input()
  parent: FormGroup;

  ngOnInit() {}

  constructor(
    private authService: AuthService,
    private routingService: RoutingService,
    private authRedirectService: AuthRedirectService
  ) {}

  isProductOutOfStock(product) {
    // TODO Move stocklevelstatuses across the app to an enum
    return (
      product &&
      product.stock &&
      product.stock.stockLevelStatus === 'outOfStock'
    );
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

  saveItemForLater() {
    this.authService.getUserToken().subscribe(token => {
      if (!token.access_token) {
        this.routingService.go({ cxRoute: 'login' });
        this.authRedirectService.reportAuthGuard();
      } else {
        this.saveForLater.emit(this.item);
      }
    });
  }
}
