import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'y-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() entry: any;
  @Input() potentialPromotions: any[];
  @Input() appliedPromotions: any[];

  @Output() remove = new EventEmitter<any>();

  removeEntry() {
    this.remove.emit(this.entry);
  }
}
