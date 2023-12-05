import { OnDestroy } from '@angular/core';
import { CartModification } from '@spartacus/cart/base/root';
import { RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CartValidationStateService implements OnDestroy {
    protected routingService: RoutingService;
    protected NAVIGATION_SKIPS: number;
    protected navigationIdCount: number;
    protected subscription: Subscription;
    cartValidationResult$: Observable<CartModification[]>;
    constructor(routingService: RoutingService);
    protected checkForValidationResultClear$: Observable<[import("@spartacus/core").RouterState, CartModification[]]>;
    ngOnDestroy(): void;
    protected setInitialState(): void;
    updateValidationResultAndRoutingId(cartModification: CartModification[]): void;
    protected setNavigationIdStep(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartValidationStateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartValidationStateService>;
}
