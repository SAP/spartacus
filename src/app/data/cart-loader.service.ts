import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OccCartService } from '../occ/occ-core/cart.service';
import { CartModelService } from './cart-model.service';

const CLIENT_CART_ID_KEY = 'cart';

@Injectable()
export class CartLoaderService {

    cartId;
    user = 'anonymous';

    private cartAdditions: BehaviorSubject<any>;

    constructor(
        protected occCartService: OccCartService,
        protected cartModel: CartModelService
    ) {
        this.cartId = localStorage.getItem(CLIENT_CART_ID_KEY);
        this.refreshCart();
    }

    refreshCart() {
        const cartId = this.getCartId();
        if (cartId) {
            this.occCartService.loadCart(this.user, cartId)
                .subscribe((cartData) => {
                    this.cartModel.store(cartData);
                },
                error => console.log(error));
        }
    }

    addToCart(productCode: string, quantity: number) {
        if (this.hasCart()) {
            this.addProductToCart(productCode, quantity);
        }else {
            this.occCartService.createCart(this.user)
                .subscribe((cartData) => {
                    localStorage.setItem(CLIENT_CART_ID_KEY, cartData.guid);
                    // this.cart = cartData;
                    this.addProductToCart(productCode, quantity);
                },
                error => console.log(error)
            );
        }
    }

    removeEntry(entry) {
        this.occCartService.remove(this.user, this.getCartId(), entry.entryNumber)
            .subscribe((data) => {
                // TODO: notify
                // console.log('removed...', data);
            },
            error => console.log(error),
            () => this.refreshCart());
    }

    private storeCartInModel(cartData) {
        // do we need it here?
        // this.cart = cartData;
        this.cartModel.store(cartData);
    }

    protected hasCart(): boolean {
        return !!this.getCartId();
    }

    protected getCartId(): string {
        return this.cartId;
    }

    protected addProductToCart(productCode: string, quantity: number) {
        // console.log('add', this.cart);

        this.occCartService.add(this.user, this.getCartId(), productCode, quantity)
            .subscribe((cartData) => {
                // localStorage.setItem(this.CART_STORAGE, JSON.stringify(cartData));
                // console.log('added', cartData);
                // this.storeCartInModel(cartData);
                this.refreshCart();
                // this.cart = cartData;
                // this.addProductToCart(productCode, quantity);
            },
            error => console.log(error)
        );
    }

}
