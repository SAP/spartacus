import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActiveCartFacade, Cart, OrderEntry, PromotionLocation } from '@spartacus/cart/base/root';
import { RoutingService } from '@spartacus/core';
import { FocusConfig, ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AddedToCartDialogComponent implements OnInit, OnDestroy {
    protected activeCartFacade: ActiveCartFacade;
    protected launchDialogService: LaunchDialogService;
    protected routingService: RoutingService;
    protected el: ElementRef;
    iconTypes: typeof ICON_TYPE;
    entry$: Observable<OrderEntry | undefined>;
    cart$: Observable<Cart>;
    loaded$: Observable<boolean>;
    addedEntryWasMerged$: Observable<boolean>;
    promotionLocation: PromotionLocation;
    quantity: number;
    pickupStoreName: string | undefined;
    form: UntypedFormGroup;
    focusConfig: FocusConfig;
    handleClick(event: UIEvent): void;
    protected quantityControl$: Observable<UntypedFormControl>;
    protected subscription: Subscription;
    constructor(activeCartFacade: ActiveCartFacade, launchDialogService: LaunchDialogService, routingService: RoutingService, el: ElementRef);
    ngOnInit(): void;
    /**
     * Returns an observable formControl with the quantity of the cartEntry,
     * but also updates the entry in case of a changed value.
     * The quantity can be set to zero in order to remove the entry.
     */
    getQuantityControl(): Observable<UntypedFormControl>;
    init(productCode: string, quantity: number, numberOfEntriesBeforeAdd: number, pickupStoreName?: string): void;
    protected getAddedEntryWasMerged(numberOfEntriesBeforeAdd: number): Observable<boolean>;
    /**
     * Adds quantity and entryNumber form controls to the FormGroup.
     * Returns quantity form control.
     */
    protected getQuantityFormControl(entry?: OrderEntry): UntypedFormControl;
    dismissModal(reason?: any): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddedToCartDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddedToCartDialogComponent, "cx-added-to-cart-dialog", never, {}, {}, never, never, false, never>;
}
