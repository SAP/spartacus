import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Context for `ProductListItemComponent`.
 */
export declare abstract class ProductListItemContext {
    readonly product$: Observable<Product>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductListItemContext, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductListItemContext>;
}
