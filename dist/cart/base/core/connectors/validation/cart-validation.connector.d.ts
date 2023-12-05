import { CartModificationList } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { CartValidationAdapter } from './cart-validation.adapter';
import * as i0 from "@angular/core";
export declare class CartValidationConnector {
    protected adapter: CartValidationAdapter;
    constructor(adapter: CartValidationAdapter);
    validate(cartId: string, userId: string): Observable<CartModificationList>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartValidationConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartValidationConnector>;
}
