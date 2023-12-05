import { ElementRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ClearCartComponent implements OnDestroy {
    protected activeCartFacade: ActiveCartFacade;
    protected vcr: ViewContainerRef;
    protected launchDialogService: LaunchDialogService;
    cart$: Observable<Cart>;
    protected subscription: Subscription;
    element: ElementRef;
    constructor(activeCartFacade: ActiveCartFacade, vcr: ViewContainerRef, launchDialogService: LaunchDialogService);
    openDialog(event: Event): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClearCartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ClearCartComponent, "cx-clear-cart", never, {}, {}, never, never, false, never>;
}
