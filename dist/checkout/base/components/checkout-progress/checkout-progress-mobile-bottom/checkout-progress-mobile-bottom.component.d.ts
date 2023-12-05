import { CheckoutStep } from '@spartacus/checkout/base/root';
import { Observable } from 'rxjs';
import { CheckoutStepService } from '../../services/checkout-step.service';
import * as i0 from "@angular/core";
export declare class CheckoutProgressMobileBottomComponent {
    protected checkoutStepService: CheckoutStepService;
    private _steps$;
    constructor(checkoutStepService: CheckoutStepService);
    activeStepIndex: number;
    activeStepIndex$: Observable<number>;
    get steps$(): Observable<CheckoutStep[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutProgressMobileBottomComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckoutProgressMobileBottomComponent, "cx-checkout-progress-mobile-bottom", never, {}, {}, never, never, false, never>;
}
