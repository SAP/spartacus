import { GetOrderEntriesContext, OrderEntriesSource, OrderEntry } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { UnitLevelOrderDetailService } from '../unit-level-order-detail';
import * as i0 from "@angular/core";
export declare class UnitOrderDetailsOrderEntriesContext implements GetOrderEntriesContext {
    protected unitLevelOrderDetailService: UnitLevelOrderDetailService;
    readonly type = OrderEntriesSource.UNIT_ORDER_DETAILS;
    constructor(unitLevelOrderDetailService: UnitLevelOrderDetailService);
    getEntries(): Observable<OrderEntry[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitOrderDetailsOrderEntriesContext, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitOrderDetailsOrderEntriesContext>;
}
