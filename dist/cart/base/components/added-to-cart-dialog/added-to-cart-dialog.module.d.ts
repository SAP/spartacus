import { AddedToCartDialogEventListener } from './added-to-cart-dialog-event.listener';
import * as i0 from "@angular/core";
import * as i1 from "./added-to-cart-dialog.component";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "../cart-shared/cart-shared.module";
import * as i5 from "@angular/router";
import * as i6 from "@spartacus/storefront";
import * as i7 from "@spartacus/core";
export declare class AddedToCartDialogModule {
    constructor(_addToCartDialogEventListener: AddedToCartDialogEventListener);
    static ɵfac: i0.ɵɵFactoryDeclaration<AddedToCartDialogModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AddedToCartDialogModule, [typeof i1.AddedToCartDialogComponent], [typeof i2.CommonModule, typeof i3.ReactiveFormsModule, typeof i4.CartSharedModule, typeof i5.RouterModule, typeof i6.SpinnerModule, typeof i6.PromotionsModule, typeof i7.UrlModule, typeof i6.IconModule, typeof i7.I18nModule, typeof i6.ItemCounterModule, typeof i6.KeyboardFocusModule], [typeof i1.AddedToCartDialogComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AddedToCartDialogModule>;
}
