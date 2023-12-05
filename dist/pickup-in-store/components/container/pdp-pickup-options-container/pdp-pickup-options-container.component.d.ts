import { ElementRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { AugmentedPointOfService, IntendedPickupLocationFacade, PickupLocationsSearchFacade, PickupOption, PickupOptionFacade, PreferredStoreFacade } from '@spartacus/pickup-in-store/root';
import { CurrentProductService, LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * A container component of the pair of the pickup options radio buttons for cart entry.
 */
export declare class PdpPickupOptionsContainerComponent implements OnInit, OnDestroy {
    protected currentProductService: CurrentProductService;
    protected intendedPickupLocationService: IntendedPickupLocationFacade;
    protected launchDialogService: LaunchDialogService;
    protected pickupOptionFacade: PickupOptionFacade;
    protected preferredStoreFacade: PreferredStoreFacade;
    protected pickupLocationsSearchService: PickupLocationsSearchFacade;
    protected vcr: ViewContainerRef;
    element: ElementRef;
    subscription: Subscription;
    availableForPickup: boolean;
    displayPickupLocation$: Observable<string | undefined>;
    pickupOption$: Observable<PickupOption>;
    intendedPickupLocation$: Observable<AugmentedPointOfService | undefined>;
    private productCode;
    private displayNameIsSet;
    constructor(currentProductService: CurrentProductService, intendedPickupLocationService: IntendedPickupLocationFacade, launchDialogService: LaunchDialogService, pickupOptionFacade: PickupOptionFacade, preferredStoreFacade: PreferredStoreFacade, pickupLocationsSearchService: PickupLocationsSearchFacade, vcr: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    openDialog(): void;
    onPickupOptionChange(option: PickupOption): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PdpPickupOptionsContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PdpPickupOptionsContainerComponent, "cx-cart-pickup-options-container", never, {}, {}, never, never, false, never>;
}
