import { OrderEntry } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { Order } from '../model/order.model';
import * as i0 from "@angular/core";
export declare abstract class OrderFacade {
    /**
     * Returns the current order
     */
    abstract getOrderDetails(): Observable<Order | undefined>;
    /**
     * Clears the current order
     */
    abstract clearPlacedOrder(): void;
    /**
     * Sets the provided order as current
     */
    abstract setPlacedOrder(order: Order): void;
    /**
     * Places an order
     */
    abstract placeOrder(termsChecked: boolean): Observable<Order>;
    /**
     * Return order's pickup entries
     */
    abstract getPickupEntries(): Observable<OrderEntry[]>;
    /**
     * Return order's delivery entries
     */
    abstract getDeliveryEntries(): Observable<OrderEntry[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderFacade>;
}
