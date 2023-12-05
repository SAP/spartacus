import { ElementRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActiveCartFacade, CartType, OrderEntry } from '@spartacus/cart/base/root';
import { CmsService } from '@spartacus/core';
import { IntendedPickupLocationFacade, PickupLocationsSearchFacade, PickupOption, PickupOptionFacade, PreferredStoreFacade, RequiredDeepPath } from '@spartacus/pickup-in-store/root';
import { LaunchDialogService, OutletContextData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
type OrderEntryRequiredFields = 'entryNumber' | 'quantity' | 'product.code' | 'product.availableForPickup';
/** An order entry with all the fields needed for using pickup in store */
type OrderEntryWithRequiredFields = RequiredDeepPath<OrderEntry, OrderEntryRequiredFields>;
/** Custom type guard to ensure we have an order entry with all the required fields */
export declare function orderEntryWithRequiredFields(orderEntry: OrderEntry | undefined): orderEntry is OrderEntryWithRequiredFields;
/**
 * A container component of the pair of the pickup options radio buttons for cart entry.
 */
export declare class CartPickupOptionsContainerComponent implements OnInit, OnDestroy {
    protected activeCartFacade: ActiveCartFacade;
    protected launchDialogService: LaunchDialogService;
    protected pickupLocationsSearchService: PickupLocationsSearchFacade;
    protected pickupOptionFacade: PickupOptionFacade;
    protected preferredStoreFacade: PreferredStoreFacade;
    protected vcr: ViewContainerRef;
    protected cmsService: CmsService;
    protected intendedPickupLocationService: IntendedPickupLocationFacade;
    protected outlet: OutletContextData<{
        item: OrderEntry;
        cartType: CartType;
    }>;
    element: ElementRef;
    pickupOption$: Observable<PickupOption | undefined>;
    disableControls$: Observable<boolean>;
    storeDetails$: Observable<{
        name: string | undefined;
        displayName: string | undefined;
    }>;
    availableForPickup$: Observable<boolean>;
    subscription: Subscription;
    cartId: string;
    cartType: CartType;
    entryNumber: number;
    productCode: string;
    quantity: number;
    userId: string;
    private displayNameIsSet;
    page?: string;
    readonly CartType: typeof CartType;
    constructor(activeCartFacade: ActiveCartFacade, launchDialogService: LaunchDialogService, pickupLocationsSearchService: PickupLocationsSearchFacade, pickupOptionFacade: PickupOptionFacade, preferredStoreFacade: PreferredStoreFacade, vcr: ViewContainerRef, cmsService: CmsService, intendedPickupLocationService: IntendedPickupLocationFacade, outlet: OutletContextData<{
        item: OrderEntry;
        cartType: CartType;
    }>);
    ngOnInit(): void;
    onPickupOptionChange(pickupOption: PickupOption): void;
    ngOnDestroy(): void;
    openDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartPickupOptionsContainerComponent, [null, null, null, null, null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CartPickupOptionsContainerComponent, "cx-cart-pickup-options-container", never, {}, {}, never, never, false, never>;
}
export {};
