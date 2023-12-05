import { FocusConfig, LaunchDialogService } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export declare enum BIND_CART_DIALOG_ACTION {
    CANCEL = "CANCEL",
    REPLACE = "REPLACE"
}
export declare class AsmBindCartDialogComponent {
    protected launchDialogService: LaunchDialogService;
    BIND_CART_ACTION: typeof BIND_CART_DIALOG_ACTION;
    focusConfig: FocusConfig;
    constructor(launchDialogService: LaunchDialogService);
    closeModal(reason: BIND_CART_DIALOG_ACTION): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmBindCartDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmBindCartDialogComponent, "cx-asm-bind-cart-dialog", never, {}, {}, never, never, false, never>;
}
