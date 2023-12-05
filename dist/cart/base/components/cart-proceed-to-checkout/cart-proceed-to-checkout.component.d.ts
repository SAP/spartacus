import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CartProceedToCheckoutComponent implements OnInit, OnDestroy {
    protected router: Router;
    protected cd?: ChangeDetectorRef | undefined;
    cartValidationInProgress: boolean;
    protected subscription: Subscription;
    constructor(router: Router, cd?: ChangeDetectorRef);
    /**
     * @deprecated since 5.2
     */
    constructor(router: Router);
    ngOnInit(): void;
    disableButtonWhileNavigation(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartProceedToCheckoutComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CartProceedToCheckoutComponent, "cx-cart-proceed-to-checkout", never, {}, {}, never, never, false, never>;
}
