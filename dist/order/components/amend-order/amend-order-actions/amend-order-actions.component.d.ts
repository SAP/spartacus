import { RoutingService } from '@spartacus/core';
import { UntypedFormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class AmendOrderActionsComponent {
    protected routingService: RoutingService;
    orderCode: string;
    amendOrderForm: UntypedFormGroup;
    backRoute: string;
    forwardRoute: string;
    styles: string;
    constructor(routingService: RoutingService);
    continue(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AmendOrderActionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AmendOrderActionsComponent, "cx-amend-order-actions", never, { "orderCode": "orderCode"; "amendOrderForm": "amendOrderForm"; "backRoute": "backRoute"; "forwardRoute": "forwardRoute"; }, {}, never, never, false, never>;
}
