import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';

export interface Item {
  product?: any;
  quantity?: any;
  basePrice?: any;
  totalPrice?: any;
}

@Component({
  selector: 'y-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() readonly = false;

  @Input() compact = false;

  @Input() item: Item;

  @Input() potentialProductPromotions: any[];

  parent: FormGroup;

  @Output() remove = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    this.parent = this.controlContainer.control as FormGroup;
  }

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
}
