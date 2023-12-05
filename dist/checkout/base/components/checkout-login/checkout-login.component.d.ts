import { OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { AuthRedirectService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CheckoutLoginComponent implements OnDestroy {
    protected formBuilder: UntypedFormBuilder;
    protected authRedirectService: AuthRedirectService;
    protected activeCartFacade: ActiveCartFacade;
    checkoutLoginForm: UntypedFormGroup;
    sub: Subscription;
    constructor(formBuilder: UntypedFormBuilder, authRedirectService: AuthRedirectService, activeCartFacade: ActiveCartFacade);
    onSubmit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutLoginComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckoutLoginComponent, "cx-checkout-login", never, {}, {}, never, never, false, never>;
}
