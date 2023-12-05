import { OnDestroy, OnInit } from '@angular/core';
import { Cart, CartOutlets, CartType, PromotionLocation } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { EventService, GlobalMessageService, RoutingService, TranslationService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { SavedCartDetailsService } from '../saved-cart-details.service';
import * as i0 from "@angular/core";
export declare class SavedCartDetailsItemsComponent implements OnInit, OnDestroy {
    protected savedCartDetailsService: SavedCartDetailsService;
    protected savedCartService: SavedCartFacade;
    protected eventSercvice: EventService;
    protected globalMessageService: GlobalMessageService;
    protected routingService: RoutingService;
    protected translation: TranslationService;
    private subscription;
    readonly CartOutlets: typeof CartOutlets;
    readonly CartType: typeof CartType;
    CartLocation: typeof PromotionLocation;
    buyItAgainTranslation$: Observable<string>;
    cartLoaded$: Observable<boolean>;
    savedCart$: Observable<Cart | undefined>;
    constructor(savedCartDetailsService: SavedCartDetailsService, savedCartService: SavedCartFacade, eventSercvice: EventService, globalMessageService: GlobalMessageService, routingService: RoutingService, translation: TranslationService);
    ngOnInit(): void;
    onDeleteComplete(success: boolean): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SavedCartDetailsItemsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SavedCartDetailsItemsComponent, "cx-saved-cart-details-items", never, {}, {}, never, never, false, never>;
}
