import { OrderEntry } from '@spartacus/cart/base/root';
import { Order, Consignment } from '@spartacus/order/root';
import * as i0 from "@angular/core";
export declare class MyAccountV2OrderConsignmentsService {
    getGroupedConsignments(order: Order, pickup: boolean): Consignment[] | undefined;
    getUnconsignedEntries(order: Order, pickup: boolean): OrderEntry[] | undefined;
    protected groupConsignments(consignments: Consignment[] | undefined): Consignment[] | undefined;
    /**
     * complete: 0
     * processing: 1
     * cancel: -1
     */
    protected getStatusGroupKey(status: string): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<MyAccountV2OrderConsignmentsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MyAccountV2OrderConsignmentsService>;
}
