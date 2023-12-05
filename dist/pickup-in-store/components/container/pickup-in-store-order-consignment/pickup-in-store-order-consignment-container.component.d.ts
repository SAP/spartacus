import { OnInit } from '@angular/core';
import { PointOfService } from '@spartacus/core';
import { Consignment } from '@spartacus/order/root';
import { OutletContextData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export type IOutletContextData = {
    item: Consignment;
};
/**
 * A container component of the pickup address for order consignment.
 */
export declare class PickupInStoreOrderConsignmentContainerComponent implements OnInit {
    protected outlet: OutletContextData<IOutletContextData>;
    constructor(outlet: OutletContextData<IOutletContextData>);
    pointOfService$: Observable<PointOfService> | undefined;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PickupInStoreOrderConsignmentContainerComponent, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PickupInStoreOrderConsignmentContainerComponent, "cx-pickup-in-store-order-consignment", never, { "pointOfService$": "pointOfService$"; }, {}, never, never, false, never>;
}
