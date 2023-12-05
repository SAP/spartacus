import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { CheckoutStep } from '@spartacus/checkout/base/root';
import { Observable } from 'rxjs';
import { CheckoutStepService } from '../../services/checkout-step.service';
import * as i0 from "@angular/core";
export declare class CheckoutProgressMobileTopComponent {
    protected activeCartFacade: ActiveCartFacade;
    protected checkoutStepService: CheckoutStepService;
    private _steps$;
    cart$: Observable<Cart>;
    constructor(activeCartFacade: ActiveCartFacade, checkoutStepService: CheckoutStepService);
    activeStepIndex: number;
    activeStepIndex$: Observable<number>;
    get steps$(): Observable<CheckoutStep[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutProgressMobileTopComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckoutProgressMobileTopComponent, "cx-checkout-progress-mobile-top", never, {}, {}, never, never, false, never>;
}
