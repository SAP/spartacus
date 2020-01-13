import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PromotionLocation, PromotionResult } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PromotionService } from '../../../../shared/services/promotion/promotion.service';

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
  @Input() compact = false;
  @Input() item: Item;
  @Input() potentialProductPromotions: any[];
  @Input() readonly = false;
  @Input() quantityControl: FormControl;

  @Output() view = new EventEmitter<any>();

  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  appliedProductPromotions$: Observable<PromotionResult[]>;

  constructor(protected promotionService: PromotionService) {}

  ngOnInit() {
    this.appliedProductPromotions$ = this.promotionService.getProductPromotionForEntry(
      this.item,
      this.promotionLocation
    );
  }

  isProductOutOfStock(product) {
    // TODO Move stocklevelstatuses across the app to an enum
    return (
      product &&
      product.stock &&
      product.stock.stockLevelStatus === 'outOfStock'
    );
  }

  removeItem() {
    this.quantityControl.setValue(0);
    this.quantityControl.markAsDirty();
  }

  viewItem() {
    this.view.emit();
  }
}
