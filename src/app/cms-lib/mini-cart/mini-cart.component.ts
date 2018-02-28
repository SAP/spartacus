import { Component } from '@angular/core';

import { Injectable, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartLoaderService } from '../../data/cart-loader.service';
import { CartModelService } from '../../data/cart-model.service';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';

@Component({
  selector: 'y-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent {
  cart;

  constructor(
    protected cd: ChangeDetectorRef,
    protected cartLoader: CartLoaderService,
    protected cartModel: CartModelService,
    protected dialog: MatDialog
  ) {}

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
