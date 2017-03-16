import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AbstractCartComponent } from '../abstract-cart-component';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { CartModelService } from '../../data/cart-model.service';

@Component({
  selector: 'y-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent extends AbstractCartComponent  {

    cart;

    bootstrap() {
        this.cartModel.get().subscribe((cartData) => {
            this.cart = cartData;
            this.cd.detectChanges();
        });
    }

    openCart() {
        this.dialog.open(CartDialogComponent);
    }

}
