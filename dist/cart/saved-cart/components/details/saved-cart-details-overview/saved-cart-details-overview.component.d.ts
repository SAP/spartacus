import { ElementRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { TranslationService } from '@spartacus/core';
import { Card, ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { SavedCartDetailsService } from '../saved-cart-details.service';
import * as i0 from "@angular/core";
export declare class SavedCartDetailsOverviewComponent implements OnDestroy {
    protected savedCartDetailsService: SavedCartDetailsService;
    protected translation: TranslationService;
    protected vcr: ViewContainerRef;
    protected launchDialogService: LaunchDialogService;
    private subscription;
    element: ElementRef;
    iconTypes: typeof ICON_TYPE;
    savedCart$: Observable<Cart | undefined>;
    constructor(savedCartDetailsService: SavedCartDetailsService, translation: TranslationService, vcr: ViewContainerRef, launchDialogService: LaunchDialogService);
    getCartName(cartName: string): Observable<Card>;
    getCartDescription(cartDescription: string): Observable<Card>;
    getCartId(cartId: string): Observable<Card>;
    getDateSaved(saveTime: string | null): Observable<Card>;
    getCartItems(totalItems: number): Observable<Card>;
    getCartQuantity(totalUnitCount: number): Observable<Card>;
    getCartTotal(totalPriceWithTax: string): Observable<Card>;
    openDialog(cart: Cart): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SavedCartDetailsOverviewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SavedCartDetailsOverviewComponent, "cx-saved-cart-details-overview", never, {}, {}, never, never, false, never>;
}
