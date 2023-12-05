import { Observable } from 'rxjs';
import { ReplenishmentOrder } from '../model/replenishment-order.model';
import { ScheduleReplenishmentForm } from '../model/scheduled-replenishment.model';
import * as i0 from "@angular/core";
export declare abstract class ScheduledReplenishmentOrderFacade {
    /**
     * Schedule a replenishment order
     */
    abstract scheduleReplenishmentOrder(scheduleReplenishmentForm: ScheduleReplenishmentForm, termsChecked: boolean): Observable<ReplenishmentOrder>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScheduledReplenishmentOrderFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScheduledReplenishmentOrderFacade>;
}
