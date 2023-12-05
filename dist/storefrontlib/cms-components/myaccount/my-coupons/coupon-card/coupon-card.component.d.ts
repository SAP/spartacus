import { ElementRef, EventEmitter, ViewContainerRef } from '@angular/core';
import { CustomerCoupon } from '@spartacus/core';
import { LaunchDialogService } from '../../../../layout/index';
import { Observable } from 'rxjs';
import { MyCouponsComponentService } from '../my-coupons.component.service';
import * as i0 from "@angular/core";
export declare class CouponCardComponent {
    protected myCouponsComponentService: MyCouponsComponentService;
    protected launchDialogService: LaunchDialogService;
    protected vcr: ViewContainerRef;
    coupon: CustomerCoupon;
    couponSubscriptionLoading$: Observable<boolean>;
    notificationChanged: EventEmitter<{
        couponId: string;
        notification: boolean;
    }>;
    element: ElementRef;
    constructor(myCouponsComponentService: MyCouponsComponentService, launchDialogService: LaunchDialogService, vcr: ViewContainerRef);
    onSubscriptionChange(): void;
    readMore(): void;
    findProducts(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CouponCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CouponCardComponent, "cx-coupon-card", never, { "coupon": "coupon"; "couponSubscriptionLoading$": "couponSubscriptionLoading$"; }, { "notificationChanged": "notificationChanged"; }, never, never, false, never>;
}
