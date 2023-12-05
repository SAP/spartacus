import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { Command, CommandService, EventService, UserIdService } from '@spartacus/core';
import { Order, OrderFacade } from '@spartacus/order/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderConnector } from '../connectors/order.connector';
import * as i0 from "@angular/core";
export declare class OrderService implements OrderFacade {
    protected activeCartFacade: ActiveCartFacade;
    protected userIdService: UserIdService;
    protected commandService: CommandService;
    protected orderConnector: OrderConnector;
    protected eventService: EventService;
    protected placedOrder$: BehaviorSubject<Order | undefined>;
    protected placeOrderCommand: Command<boolean, Order>;
    constructor(activeCartFacade: ActiveCartFacade, userIdService: UserIdService, commandService: CommandService, orderConnector: OrderConnector, eventService: EventService);
    /**
     * Performs the necessary checkout preconditions.
     */
    protected checkoutPreconditions(): Observable<[string, string]>;
    placeOrder(termsChecked: boolean): Observable<Order>;
    getOrderDetails(): Observable<Order | undefined>;
    clearPlacedOrder(): void;
    setPlacedOrder(order: Order): void;
    getPickupEntries(): Observable<OrderEntry[]>;
    getDeliveryEntries(): Observable<OrderEntry[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderService>;
}
