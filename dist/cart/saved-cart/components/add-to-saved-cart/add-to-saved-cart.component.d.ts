import { ElementRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { AuthService, RoutingService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AddToSavedCartComponent implements OnInit, OnDestroy {
    protected activeCartFacade: ActiveCartFacade;
    protected authService: AuthService;
    protected routingService: RoutingService;
    protected vcr: ViewContainerRef;
    protected launchDialogService: LaunchDialogService;
    protected subscription: Subscription;
    protected loggedIn: boolean;
    element: ElementRef;
    cart$: Observable<Cart>;
    /**
     * Whether to show the "Save cart for later" button. Contingent on whether there are actual entries to save.
     */
    disableSaveCartForLater$: Observable<boolean>;
    constructor(activeCartFacade: ActiveCartFacade, authService: AuthService, routingService: RoutingService, vcr: ViewContainerRef, launchDialogService: LaunchDialogService);
    ngOnInit(): void;
    saveCart(cart: Cart): void;
    openDialog(cart: Cart): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddToSavedCartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddToSavedCartComponent, "cx-add-to-saved-cart", never, {}, {}, never, never, false, never>;
}
