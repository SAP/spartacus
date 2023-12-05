import { CheckoutStep } from '@spartacus/checkout/base/root';
import { Observable } from 'rxjs';
import { CheckoutStepService } from '../services/checkout-step.service';
import * as i0 from "@angular/core";
export declare class CheckoutProgressComponent {
    protected checkoutStepService: CheckoutStepService;
    private _steps$;
    constructor(checkoutStepService: CheckoutStepService);
    activeStepIndex: number;
    activeStepIndex$: Observable<number>;
    get steps$(): Observable<CheckoutStep[]>;
    getTabIndex(stepIndex: number): number;
    isActive(index: number): boolean;
    isDisabled(index: number): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutProgressComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckoutProgressComponent, "cx-checkout-progress", never, {}, {}, never, never, false, never>;
}
