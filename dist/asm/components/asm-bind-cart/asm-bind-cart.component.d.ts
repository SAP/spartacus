import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { AsmBindCartFacade } from '@spartacus/asm/root';
import { ActiveCartFacade, Cart, MultiCartFacade } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { FeatureConfigService, GlobalMessageService, RoutingService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BIND_CART_DIALOG_ACTION } from '../asm-bind-cart-dialog/asm-bind-cart-dialog.component';
import { AsmComponentService } from '../services/asm-component.service';
import * as i0 from "@angular/core";
export declare class AsmBindCartComponent implements OnInit, OnDestroy {
    protected globalMessageService: GlobalMessageService;
    protected activeCartFacade: ActiveCartFacade;
    protected multiCartFacade: MultiCartFacade;
    protected asmBindCartFacade: AsmBindCartFacade;
    protected launchDialogService: LaunchDialogService;
    protected savedCartFacade: SavedCartFacade;
    protected asmComponentService?: AsmComponentService | undefined;
    protected routing?: RoutingService | undefined;
    protected featureConfig?: FeatureConfigService | undefined;
    activeCartValidator: ValidatorFn;
    cartId: FormControl<string | null>;
    loading$: BehaviorSubject<boolean>;
    valid$: Observable<boolean>;
    activeCartId: string;
    deepLinkCartId: string;
    displayBindCartBtn$: BehaviorSubject<boolean>;
    displaySaveCartBtn$: BehaviorSubject<boolean>;
    bindToCartElemRef: ElementRef<HTMLButtonElement>;
    saveInactiveCartElemRef: ElementRef<HTMLButtonElement>;
    protected subscription: Subscription;
    constructor(globalMessageService: GlobalMessageService, activeCartFacade: ActiveCartFacade, multiCartFacade: MultiCartFacade, asmBindCartFacade: AsmBindCartFacade, launchDialogService: LaunchDialogService, savedCartFacade: SavedCartFacade, asmComponentService: AsmComponentService, routing: RoutingService, featureConfig: FeatureConfigService);
    /**
     * @deprecated since 7.0
     */
    constructor(globalMessageService: GlobalMessageService, activeCartFacade: ActiveCartFacade, multiCartFacade: MultiCartFacade, asmBindCartFacade: AsmBindCartFacade, launchDialogService: LaunchDialogService, savedCartFacade: SavedCartFacade);
    ngOnInit(): void;
    resetInput(): void;
    /**
     * Bind the input cart number to the customer
     */
    bindCartToCustomer(): void;
    onSaveInactiveCart(): void;
    clearText(): void;
    protected resetDeeplinkCart(): void;
    ngOnDestroy(): void;
    /**
     * Binds cart on subscription and reloads cart
     */
    protected simpleBindCart(anonymousCartId: string): Observable<unknown>;
    /**
     * Opens dialog and passes non-cancel result to select action
     */
    protected openDialog(activeCartId: string, anonymousCartId: string): Observable<unknown>;
    protected selectBindAction(activeCartId: string, anonymousCartId: string, action: BIND_CART_DIALOG_ACTION): Observable<unknown>;
    protected replaceCart(previousActiveCartId: string, anonymousCartId: string): Observable<unknown>;
    protected subscribeForDeeplinkCart(): void;
    /**
     * @deprecated in 6.3: Will be removed in CXSPA-3090.
     */
    protected onDeeplinkCart(): void;
    /**
     * @deprecated in 6.3: Will be removed in CXSPA-3090.
     */
    protected isDeepLinkInactiveCart(): boolean;
    /**
     * @deprecated in 6.3: Will be removed in CXSPA-3090.
     */
    protected isDeepLinkActiveCart(): boolean;
    protected openASMSaveCartDialog(inactiveCart: Cart): void;
    protected afterCloseASMSaveCartDialog(): void;
    protected goToSavedCartDetails(cartId: string): void;
    /**
     * @deprecated in 6.3: Will be removed in CXSPA-3090.
     */
    protected goToActiveCartDetail(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmBindCartComponent, [null, null, null, null, null, null, { optional: true; }, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmBindCartComponent, "cx-asm-bind-cart", never, {}, {}, never, never, false, never>;
}
