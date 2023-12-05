import { Cart, OrderEntry } from '@spartacus/cart/base/root';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class WishListComponent {
    protected wishListFacade: WishListFacade;
    wishList$: Observable<Cart>;
    loading$: Observable<boolean>;
    constructor(wishListFacade: WishListFacade);
    removeEntry(item: OrderEntry): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WishListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WishListComponent, "cx-wish-list", never, {}, {}, never, never, false, never>;
}
