import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { OrderAdapter } from './order.adapter';
import * as i0 from "@angular/core";
export declare class OrderConnector {
    protected adapter: OrderAdapter;
    constructor(adapter: OrderAdapter);
    placeOrder(userId: string, cartId: string, termsChecked: boolean): Observable<Order>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderConnector>;
}
