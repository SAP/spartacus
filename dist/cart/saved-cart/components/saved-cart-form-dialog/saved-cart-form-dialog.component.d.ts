import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Cart } from '@spartacus/cart/base/root';
import { SavedCartFacade, SavedCartFormType } from '@spartacus/cart/saved-cart/root';
import { EventService, GlobalMessageService, RoutingService } from '@spartacus/core';
import { FocusConfig, ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export interface SavedCartFormDialogOptions {
    cart: Cart;
    layoutOption?: string;
}
export declare class SavedCartFormDialogComponent implements OnInit, OnDestroy {
    protected launchDialogService: LaunchDialogService;
    protected el: ElementRef;
    protected savedCartService: SavedCartFacade;
    protected eventService: EventService;
    protected routingService: RoutingService;
    protected globalMessageService: GlobalMessageService;
    private subscription;
    savedCartFormType: typeof SavedCartFormType;
    form: UntypedFormGroup;
    iconTypes: typeof ICON_TYPE;
    cart: Cart;
    layoutOption: string | undefined;
    descriptionMaxLength: number;
    nameMaxLength: number;
    isCloneSavedCart: boolean;
    focusConfig: FocusConfig;
    isLoading$: Observable<boolean>;
    isDisableDeleteButton$: Observable<boolean>;
    isDisableRestoreButton$: Observable<boolean>;
    get descriptionsCharacterLeft(): number;
    handleClick(event: UIEvent): void;
    constructor(launchDialogService: LaunchDialogService, el: ElementRef, savedCartService: SavedCartFacade, eventService: EventService, routingService: RoutingService, globalMessageService: GlobalMessageService);
    ngOnInit(): void;
    saveOrEditCart(cartId: string): void;
    deleteCart(cartId: string): void;
    restoreSavedCart(cartId: string): void;
    close(reason: string): void;
    onComplete(success: boolean): void;
    toggleIsCloneSavedCart(): boolean;
    protected build(cart?: Cart): void;
    protected patchData(item?: any): void;
    private resetSavedCartStates;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SavedCartFormDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SavedCartFormDialogComponent, "cx-saved-cart-form-dialog", never, {}, {}, never, never, false, never>;
}
