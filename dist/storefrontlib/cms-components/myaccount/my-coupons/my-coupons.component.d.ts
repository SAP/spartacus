import { OnDestroy, OnInit } from '@angular/core';
import { CustomerCouponSearchResult, CustomerCouponService, PaginationModel } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../../misc/icon/icon.model';
import { MyCouponsComponentService } from './my-coupons.component.service';
import * as i0 from "@angular/core";
export declare class MyCouponsComponent implements OnInit, OnDestroy {
    protected couponService: CustomerCouponService;
    protected myCouponsComponentService: MyCouponsComponentService;
    couponResult$: Observable<CustomerCouponSearchResult>;
    couponsLoading$: Observable<boolean>;
    couponSubscriptionLoading$: Observable<boolean>;
    iconTypes: typeof ICON_TYPE;
    private subscriptions;
    private PAGE_SIZE;
    private sortMapping;
    sort: string;
    sortOptions: {
        code: string;
        selected: boolean;
    }[];
    pagination: PaginationModel;
    sortLabels: Observable<{
        byStartDateAsc: string;
        byStartDateDesc: string;
        byEndDateAsc: string;
        byEndDateDesc: string;
    }>;
    constructor(couponService: CustomerCouponService, myCouponsComponentService: MyCouponsComponentService);
    ngOnInit(): void;
    private subscriptionFail;
    sortChange(sort: string): void;
    pageChange(page: number): void;
    notificationChange({ couponId, notification, }: {
        couponId: string;
        notification: boolean;
    }): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MyCouponsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MyCouponsComponent, "cx-my-coupons", never, {}, {}, never, never, false, never>;
}
