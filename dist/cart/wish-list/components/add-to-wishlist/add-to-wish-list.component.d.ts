import { OrderEntry } from '@spartacus/cart/base/root';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import { AuthService, Product } from '@spartacus/core';
import { CurrentProductService, ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AddToWishListComponent {
    protected wishListFacade: WishListFacade;
    protected currentProductService: CurrentProductService;
    protected authService: AuthService;
    product$: Observable<Product>;
    wishListEntries$: Observable<OrderEntry[]>;
    loading$: Observable<boolean>;
    userLoggedIn$: Observable<boolean>;
    hasStock: boolean;
    iconTypes: typeof ICON_TYPE;
    constructor(wishListFacade: WishListFacade, currentProductService: CurrentProductService, authService: AuthService);
    add(product: Product): void;
    remove(entry: OrderEntry): void;
    getProductInWishList(product: Product, entries: OrderEntry[]): OrderEntry | undefined;
    protected setStockInfo(product: Product): void;
    protected getWishListEntries(): Observable<OrderEntry[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddToWishListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddToWishListComponent, "cx-add-to-wishlist", never, {}, {}, never, never, false, never>;
}
