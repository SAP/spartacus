import { OnInit } from '@angular/core';
import { ActiveCartFacade, Cart, OrderEntry, PromotionLocation, SelectiveCartFacade } from '@spartacus/cart/base/root';
import { CmsParagraphComponent, CmsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class SaveForLaterComponent implements OnInit {
    protected cmsService: CmsService;
    protected cartService: ActiveCartFacade;
    protected selectiveCartService: SelectiveCartFacade;
    saveForLater$: Observable<Cart>;
    cart$: Observable<Cart>;
    entries$: Observable<OrderEntry[]>;
    cartLoaded$: Observable<boolean>;
    data$: Observable<CmsParagraphComponent>;
    isCartEmpty$: Observable<boolean>;
    CartLocation: typeof PromotionLocation;
    constructor(cmsService: CmsService, cartService: ActiveCartFacade, selectiveCartService: SelectiveCartFacade);
    ngOnInit(): void;
    moveToCart(item: OrderEntry): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SaveForLaterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SaveForLaterComponent, "cx-save-for-later", never, {}, {}, never, never, false, never>;
}
