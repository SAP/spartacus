import { ElementRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { RoutingService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class SavedCartListComponent implements OnInit, OnDestroy {
    protected routing: RoutingService;
    protected savedCartService: SavedCartFacade;
    protected vcr: ViewContainerRef;
    protected launchDialogService: LaunchDialogService;
    private subscription;
    restoreButton: ElementRef;
    isLoading$: Observable<boolean>;
    savedCarts$: Observable<Cart[]>;
    constructor(routing: RoutingService, savedCartService: SavedCartFacade, vcr: ViewContainerRef, launchDialogService: LaunchDialogService);
    ngOnInit(): void;
    goToSavedCartDetails(cart: Cart): void;
    openDialog(event: Event, cart: Cart): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SavedCartListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SavedCartListComponent, "cx-saved-cart-list", never, {}, {}, never, never, false, never>;
}
