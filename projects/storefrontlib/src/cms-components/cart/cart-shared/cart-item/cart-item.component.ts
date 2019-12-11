import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FeatureConfigService } from '@spartacus/core';

export interface Item {
  product?: any;
  quantity?: any;
  basePrice?: any;
  totalPrice?: any;
  updateable?: boolean;
}

export interface CartItemComponentOptions {
  isReadOnly?: boolean;
  saveForLaterEnabled?: boolean;
  optionalBtn?: any;
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

  /**
   * @deprecated deprecated since 1.4, using options.isReadOnly to replace
   */
  @Input()
  isReadOnly = false;
  @Input()
  cartIsLoading = false;

  @Input()
  options: CartItemComponentOptions = {
    isReadOnly: false,
  };

  @Output()
  remove = new EventEmitter<any>();
  @Output()
  update = new EventEmitter<any>();
  @Output()
  view = new EventEmitter<any>();

  @Input()
  parent: FormGroup;

  ngOnInit() {}

  constructor(private featureConfig: FeatureConfigService) {}

  isSaveForLaterEnabled(): boolean {
    return this.featureConfig.isEnabled('saveForLater');
  }

  isProductOutOfStock(product: any) {
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
}
