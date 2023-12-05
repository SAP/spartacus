import { ElementRef, OnDestroy } from '@angular/core';
import { ClearCartDialogComponentService } from './clear-cart-dialog-component.service';
import { ICON_TYPE, FocusConfig } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export declare class ClearCartDialogComponent implements OnDestroy {
    protected el: ElementRef;
    protected clearCartDialogComponentService: ClearCartDialogComponentService;
    focusConfig: FocusConfig;
    isClearing: boolean;
    iconTypes: typeof ICON_TYPE;
    handleClick(event: UIEvent): void;
    constructor(el: ElementRef, clearCartDialogComponentService: ClearCartDialogComponentService);
    clearCart(): void;
    close(reason: string): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClearCartDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ClearCartDialogComponent, "cx-clear-cart-dialog", never, {}, {}, never, never, false, never>;
}
