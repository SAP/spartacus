import { Component } from '@angular/core';
import { AbstractCartComponent } from '../abstract-cart-component';

@Component({
  selector: 'y-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent extends AbstractCartComponent {
  cart;

  bootstrap() {
    /*this.cartModel.getCart().subscribe((cartData) => {
            this.cart = cartData;
            this.cd.detectChanges();
        });*/
  }

  openCart() {
    // this.dialog.open(CartDialogComponent);
  }
}
