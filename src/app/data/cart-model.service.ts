/**
 * contains a model for the cart as well as the individual cart entries
 */
import { Injectable } from '@angular/core';
import { ModelService } from './model.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const CART_KEY = 'cart';
const CART_ENTRY_KEY = 'cartentry_';
const ACCESS_TOKEN_KEY = 'cartAccessToken';

@Injectable()
export class CartModelService extends ModelService {

    getCart() {
        return super.get(CART_KEY);
    }

    storeCart(model) {
        super.store(CART_KEY, model);
    }

    /**
     * clearing the cart means we need to notify both cart
     * subscribers as well as cart entry subscribers
     */
    clearCart() {
        this.clearEntries();
        super.store(CART_KEY, null);
    }

    getEntry(productCode: string) {
        return super.get(CART_ENTRY_KEY + productCode);
    }

    storeEntry(productCode: string, model) {
        super.store(CART_ENTRY_KEY + productCode, model);
    }

    clearEntries() {
        const cartData = this.getCart().value;
        if (cartData && cartData.entries) {
            for (const entry of cartData.entries) {
                this.storeEntry(entry.product.code, null);
            }
        }
    }

    getToken() {
        return super.get(ACCESS_TOKEN_KEY);
    }

    storeToken(model) {
        super.store(ACCESS_TOKEN_KEY, model);
    }

}
