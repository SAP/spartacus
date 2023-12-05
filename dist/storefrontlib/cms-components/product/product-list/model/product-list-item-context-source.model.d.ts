import { Product } from '@spartacus/core';
import { ReplaySubject } from 'rxjs';
import { ProductListItemContext } from './product-list-item-context.model';
import * as i0 from "@angular/core";
/**
 * Context source for `ProductListItemComponent`.
 *
 * `ProductListItemContext` should be injected instead in child components.
 */
export declare class ProductListItemContextSource extends ProductListItemContext {
    readonly product$: ReplaySubject<Product>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductListItemContextSource, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductListItemContextSource>;
}
