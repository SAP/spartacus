import { Observable } from 'rxjs';
import { CartVoucherAdapter } from './cart-voucher.adapter';
import * as i0 from "@angular/core";
export declare class CartVoucherConnector {
    protected adapter: CartVoucherAdapter;
    constructor(adapter: CartVoucherAdapter);
    add(userId: string, cartId: string, voucherId: string): Observable<{}>;
    remove(userId: string, cartId: string, voucherId: string): Observable<{}>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartVoucherConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartVoucherConnector>;
}
