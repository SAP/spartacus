import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { CustomerCoupon } from '@spartacus/core';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/index';
import { FocusConfig, LaunchDialogService } from '../../../../../layout/index';
import * as i0 from "@angular/core";
export declare class CouponDialogComponent implements OnDestroy, OnInit {
    protected launchDialogService: LaunchDialogService;
    protected el: ElementRef;
    private subscription;
    iconTypes: typeof ICON_TYPE;
    coupon: CustomerCoupon;
    focusConfig: FocusConfig;
    handleClick(event: UIEvent): void;
    constructor(launchDialogService: LaunchDialogService, el: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    close(reason?: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CouponDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CouponDialogComponent, "cx-coupon-dialog", never, {}, {}, never, never, false, never>;
}
