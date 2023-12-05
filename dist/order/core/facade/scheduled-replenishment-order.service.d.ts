import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { Command, CommandService, EventService, UserIdService } from '@spartacus/core';
import { OrderFacade, ReplenishmentOrder, ScheduledReplenishmentOrderFacade, ScheduleReplenishmentForm } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { ScheduledReplenishmentOrderConnector } from '../connectors/scheduled-replenishment-order.connector';
import * as i0 from "@angular/core";
export declare class ScheduledReplenishmentOrderService implements ScheduledReplenishmentOrderFacade {
    protected activeCartFacade: ActiveCartFacade;
    protected userIdService: UserIdService;
    protected commandService: CommandService;
    protected scheduledReplenishmentOrderConnector: ScheduledReplenishmentOrderConnector;
    protected eventService: EventService;
    protected orderFacade: OrderFacade;
    protected scheduleReplenishmentOrderCommand: Command<{
        termsChecked: boolean;
        form: ScheduleReplenishmentForm;
    }, ReplenishmentOrder>;
    constructor(activeCartFacade: ActiveCartFacade, userIdService: UserIdService, commandService: CommandService, scheduledReplenishmentOrderConnector: ScheduledReplenishmentOrderConnector, eventService: EventService, orderFacade: OrderFacade);
    protected checkoutPreconditions(): Observable<[string, string]>;
    /**
     * Schedule a replenishment order
     */
    scheduleReplenishmentOrder(scheduleReplenishmentForm: ScheduleReplenishmentForm, termsChecked: boolean): Observable<ReplenishmentOrder>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScheduledReplenishmentOrderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScheduledReplenishmentOrderService>;
}
