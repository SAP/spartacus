import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CartDetailsComponent } from '../../../cart/components/cart-details/cart-details.component';

@Component({
  selector: 'y-cart-page-layout',
  templateUrl: './cart-page-layout.component.html',
  styleUrls: ['./cart-page-layout.component.scss']
})
export class CartPageLayoutComponent implements AfterViewInit {
  @ViewChild(CartDetailsComponent) cartDetail: CartDetailsComponent;

  cart: any;

  ngAfterViewInit() {
    this.cartDetail.cart$.subscribe(data => (this.cart = data));
  }
}
