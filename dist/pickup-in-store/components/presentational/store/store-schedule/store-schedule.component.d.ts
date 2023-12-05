import { OnChanges } from '@angular/core';
import { PointOfService } from '@spartacus/core';
import * as i0 from "@angular/core";
type OpeningTime = {
    weekDay?: string;
    openingHours?: string;
    closed?: boolean;
};
/**
 * A presentational component for a store's opening hours
 */
export declare class StoreScheduleComponent implements OnChanges {
    /** The details of the store */
    storeDetails: PointOfService;
    openingTimes: OpeningTime[];
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreScheduleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StoreScheduleComponent, "cx-store-schedule", never, { "storeDetails": "storeDetails"; }, {}, never, never, false, never>;
}
export {};
