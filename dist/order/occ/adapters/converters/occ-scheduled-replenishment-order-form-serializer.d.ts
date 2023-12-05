import { Converter, Occ } from '@spartacus/core';
import { ScheduleReplenishmentForm } from '@spartacus/order/root';
import * as i0 from "@angular/core";
export declare class OccScheduledReplenishmentOrderFormSerializer implements Converter<Occ.ScheduleReplenishmentForm, ScheduleReplenishmentForm> {
    convert(source: Occ.ScheduleReplenishmentForm, target?: ScheduleReplenishmentForm): ScheduleReplenishmentForm;
    /**
     * Adds the current timestamp (including timezone offset) to a date string in the format YYYY-mm-dd
     * @Example
     * Converts 2021-10-15 to 2021-10-15T15:38:05-05:00
     */
    private convertDate;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccScheduledReplenishmentOrderFormSerializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccScheduledReplenishmentOrderFormSerializer>;
}
