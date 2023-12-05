import { OnInit } from '@angular/core';
import { OutletContextData } from '@spartacus/storefront';
import { ConsignmentTrackingComponent } from '../../order-detail-items';
import * as i0 from "@angular/core";
export declare class MyAccountV2ConsignmentTrackingComponent extends ConsignmentTrackingComponent implements OnInit {
    componentClass: string;
    protected outlet: OutletContextData<any>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MyAccountV2ConsignmentTrackingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MyAccountV2ConsignmentTrackingComponent, "cx-my-account-v2-consignment-tracking", never, {}, {}, never, never, false, never>;
}
