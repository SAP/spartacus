import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CartLoaderService } from '../../../data/cart-loader.service';
import { CartModelService } from '../../../data/cart-model.service';

@Component({
    selector: 'y-cart-dialog',
    templateUrl: './cart-dialog.component.html',
    styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent implements OnInit, OnDestroy {

    cart;

    constructor(
        protected cd: ChangeDetectorRef,
        private cartModel: CartModelService,
        protected cartLoader: CartLoaderService
    ) { }

    ngOnInit() {
        this.cartModel.getCart().subscribe((cartData) => {
            this.cart = cartData;
            this.cd.markForCheck();
        });
    }

    ngOnDestroy() {
         this.cd.detach();
    }

    removeEntry(entry) {
        this.cartLoader.removeCartEntry(entry);
    }

}
