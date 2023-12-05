import { OnDestroy, OnInit } from '@angular/core';
import { CheckoutCostCenterFacade, CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CostCenter, UserCostCenterService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CheckoutCostCenterComponent implements OnInit, OnDestroy {
    protected userCostCenterService: UserCostCenterService;
    protected checkoutCostCenterFacade: CheckoutCostCenterFacade;
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade;
    protected subscription: Subscription;
    protected userCostCenters$: Observable<CostCenter[]>;
    costCenterId: string | undefined;
    costCenters$: Observable<CostCenter[]>;
    isAccountPayment: boolean;
    get disabled(): boolean;
    constructor(userCostCenterService: UserCostCenterService, checkoutCostCenterFacade: CheckoutCostCenterFacade, checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade);
    ngOnInit(): void;
    setCostCenter(selectCostCenter: string): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutCostCenterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckoutCostCenterComponent, "cx-cost-center", never, {}, {}, never, never, false, never>;
}
