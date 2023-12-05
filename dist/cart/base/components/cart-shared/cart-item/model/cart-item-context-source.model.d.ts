import { UntypedFormControl } from '@angular/forms';
import { CartItemComponentOptions, CartItemContext, OrderEntry, PromotionLocation } from '@spartacus/cart/base/root';
import { ReplaySubject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Context source for `CartItemComponent`.
 *
 * `CartItemContext` should be injected instead in child components.
 */
export declare class CartItemContextSource implements CartItemContext {
    readonly compact$: ReplaySubject<boolean>;
    readonly readonly$: ReplaySubject<boolean>;
    readonly item$: ReplaySubject<OrderEntry>;
    readonly quantityControl$: ReplaySubject<UntypedFormControl>;
    readonly location$: ReplaySubject<PromotionLocation>;
    readonly options$: ReplaySubject<CartItemComponentOptions>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartItemContextSource, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartItemContextSource>;
}
