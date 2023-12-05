import { OnInit } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { GlobalMessageType } from '@spartacus/core';
import { FocusConfig, LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare enum SAVE_CART_DIALOG_ACTION {
    CANCEL = "CANCEL",
    SAVE = "SAVE"
}
export declare class AsmSaveCartDialogComponent implements OnInit {
    protected launchDialogService: LaunchDialogService;
    protected savedCartFacade: SavedCartFacade;
    BIND_CART_ACTION: typeof SAVE_CART_DIALOG_ACTION;
    showDialogAlert$: BehaviorSubject<boolean>;
    globalMessageType: typeof GlobalMessageType;
    cart: Cart;
    cartQty: number;
    focusConfig: FocusConfig;
    constructor(launchDialogService: LaunchDialogService, savedCartFacade: SavedCartFacade);
    ngOnInit(): void;
    setCartTotalQty(): void;
    closeDialogAlert(): void;
    closeModal(reason: SAVE_CART_DIALOG_ACTION): void;
    protected saveCart(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmSaveCartDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmSaveCartDialogComponent, "cx-asm-save-cart-dialog", never, {}, {}, never, never, false, never>;
}
