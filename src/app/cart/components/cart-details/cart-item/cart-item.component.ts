import { Component, Input } from '@angular/core';

@Component({
  selector: 'y-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() entry: any;
}
