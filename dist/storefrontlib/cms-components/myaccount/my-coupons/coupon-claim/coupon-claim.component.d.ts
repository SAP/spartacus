import { OnInit, OnDestroy } from '@angular/core';
import { RoutingService, CustomerCouponService, GlobalMessageService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CouponClaimComponent implements OnInit, OnDestroy {
    protected couponService: CustomerCouponService;
    protected routingService: RoutingService;
    protected messageService: GlobalMessageService;
    subscription: Subscription;
    constructor(couponService: CustomerCouponService, routingService: RoutingService, messageService: GlobalMessageService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CouponClaimComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CouponClaimComponent, "cx-coupon-claim", never, {}, {}, never, never, false, never>;
}
