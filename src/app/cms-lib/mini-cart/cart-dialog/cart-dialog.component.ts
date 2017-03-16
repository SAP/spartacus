import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartLoaderService } from '../../../data/cart-loader.service';
import { CartModelService } from '../../../data/cart-model.service';

@Component({
  selector: 'y-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent implements OnInit {

    cart;

    constructor(
        protected cd: ChangeDetectorRef,
        private cartModel: CartModelService,
        protected cartLoader: CartLoaderService
    ) { }

    ngOnInit() {
        this.cartModel.get().subscribe((cartData) => {
            this.cart = cartData;
            this.cd.detectChanges();
        });
    }


    removeEntry(entry) {
        this.cartLoader.removeEntry(entry);
    }

}
