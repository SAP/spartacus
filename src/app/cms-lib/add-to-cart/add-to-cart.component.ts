import { Component, OnInit } from '@angular/core';
import { AbstractCartComponent } from '../abstract-cart-component';

@Component({
    selector: 'y-add-to-cart',
    templateUrl: './add-to-cart.component.html',
    styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent extends AbstractCartComponent {

    quantity = 1;

    public addToCart() {
        const productCode = this.contextParameters.productCode;
        this.cartLoader.addToCart(productCode, this.quantity);
    }


}
