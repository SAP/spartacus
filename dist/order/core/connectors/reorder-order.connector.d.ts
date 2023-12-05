import { Observable } from 'rxjs';
import { ReorderOrderAdapter } from './reorder-order.adapter';
import { CartModificationList } from '@spartacus/cart/base/root';
import * as i0 from "@angular/core";
export declare class ReorderOrderConnector {
    protected adapter: ReorderOrderAdapter;
    constructor(adapter: ReorderOrderAdapter);
    reorder(orderId: string, userId: string): Observable<CartModificationList>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReorderOrderConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReorderOrderConnector>;
}
