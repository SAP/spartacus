import { OnInit } from '@angular/core';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CartTotalsComponent implements OnInit {
    protected activeCartService: ActiveCartFacade;
    cart$: Observable<Cart>;
    constructor(activeCartService: ActiveCartFacade);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartTotalsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CartTotalsComponent, "cx-cart-totals", never, {}, {}, never, never, false, never>;
}
