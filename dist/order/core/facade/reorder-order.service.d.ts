import { ActiveCartFacade, CartModificationList, MultiCartFacade } from '@spartacus/cart/base/root';
import { Command, CommandService, UserIdService } from '@spartacus/core';
import { ReorderOrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { ReorderOrderConnector } from '../connectors/reorder-order.connector';
import * as i0 from "@angular/core";
export declare class ReorderOrderService implements ReorderOrderFacade {
    protected commandService: CommandService;
    protected reorderOrderConnector: ReorderOrderConnector;
    protected userIdService: UserIdService;
    protected activeCartFacade: ActiveCartFacade;
    protected multiCartFacade: MultiCartFacade;
    protected reorderCommand: Command<{
        orderId: string;
    }, CartModificationList>;
    constructor(commandService: CommandService, reorderOrderConnector: ReorderOrderConnector, userIdService: UserIdService, activeCartFacade: ActiveCartFacade, multiCartFacade: MultiCartFacade);
    /**
     * Create cart from an existing order
     */
    reorder(orderId: string): Observable<CartModificationList>;
    protected reorderPreconditions(): Observable<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReorderOrderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReorderOrderService>;
}
