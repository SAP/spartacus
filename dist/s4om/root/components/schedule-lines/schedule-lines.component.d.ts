import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { CxDatePipe, TranslationService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ScheduleLinesComponent {
    protected cartItemContext: CartItemContext;
    protected translationService: TranslationService;
    protected datePipe: CxDatePipe;
    constructor(cartItemContext: CartItemContext, translationService: TranslationService, datePipe: CxDatePipe);
    readonly orderEntry$: Observable<OrderEntry>;
    /**
     * Verifies whether the Schedule Line infos have any entries.
     * Only in this case we want to display the schedule line summary
     *
     * @param {OrderEntry} item - Cart item
     * @returns {boolean} - whether the Schedule Line information is present for the order
     */
    hasScheduleLines(item: OrderEntry): boolean;
    getScheduleLineInfoId(index: number): string;
    getLongDate(date?: Date): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScheduleLinesComponent, [{ optional: true; }, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ScheduleLinesComponent, "cx-schedule-lines", never, {}, {}, never, never, false, never>;
}
