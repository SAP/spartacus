import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderEntry } from '../models/cart.model';
import { CartItemComponentOptions, PromotionLocation } from './cart.model';
import * as i0 from "@angular/core";
/**
 * Context for `CartItemComponent`.
 */
export declare abstract class CartItemContext {
    readonly compact$: Observable<boolean>;
    readonly readonly$: Observable<boolean>;
    readonly item$: Observable<OrderEntry>;
    readonly quantityControl$: Observable<UntypedFormControl>;
    readonly location$: Observable<PromotionLocation>;
    readonly options$: Observable<CartItemComponentOptions>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartItemContext, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartItemContext>;
}
