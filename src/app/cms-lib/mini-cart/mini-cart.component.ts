import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {MdDialog} from '@angular/material';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { CartModelService } from '../../data/cart-model.service';

@Component({
  selector: 'y-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent implements OnInit {

    cart;

    constructor(
        protected cd: ChangeDetectorRef,
        protected cartModel: CartModelService,
        protected dialog: MdDialog
    ) {}

    ngOnInit() {
        this.cartModel.get().subscribe((cartData) => {
            this.cart = cartData;
            this.cd.detectChanges();
        });
    }

    openCart() {
        this.dialog.open(CartDialogComponent);
    }

}
