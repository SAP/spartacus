import { ElementRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { SavedCartFormType } from '@spartacus/cart/saved-cart/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { SavedCartDetailsService } from '../saved-cart-details.service';
import * as i0 from "@angular/core";
export declare class SavedCartDetailsActionComponent implements OnDestroy {
    protected savedCartDetailsService: SavedCartDetailsService;
    protected vcr: ViewContainerRef;
    protected launchDialogService: LaunchDialogService;
    private subscription;
    savedCartFormType: typeof SavedCartFormType;
    element: ElementRef;
    savedCart$: Observable<Cart | undefined>;
    constructor(savedCartDetailsService: SavedCartDetailsService, vcr: ViewContainerRef, launchDialogService: LaunchDialogService);
    openDialog(cart: Cart, type: SavedCartFormType): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SavedCartDetailsActionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SavedCartDetailsActionComponent, "cx-saved-cart-details-action", never, {}, {}, never, never, false, never>;
}
