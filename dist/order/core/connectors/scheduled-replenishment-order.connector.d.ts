import { ReplenishmentOrder, ScheduleReplenishmentForm } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { ScheduledReplenishmentOrderAdapter } from './scheduled-replenishment-order.adapter';
import * as i0 from "@angular/core";
export declare class ScheduledReplenishmentOrderConnector {
    protected adapter: ScheduledReplenishmentOrderAdapter;
    constructor(adapter: ScheduledReplenishmentOrderAdapter);
    scheduleReplenishmentOrder(cartId: string, scheduleReplenishmentForm: ScheduleReplenishmentForm, termsChecked: boolean, userId: string): Observable<ReplenishmentOrder>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScheduledReplenishmentOrderConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScheduledReplenishmentOrderConnector>;
}
