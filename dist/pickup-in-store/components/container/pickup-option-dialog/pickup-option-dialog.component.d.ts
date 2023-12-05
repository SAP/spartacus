import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { IntendedPickupLocationFacade, LocationSearchParams, PickupLocationsSearchFacade, PickupOptionFacade } from '@spartacus/pickup-in-store/root';
import { FocusConfig, ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * The dialog box to select the pickup location for a product.
 */
export declare class PickupOptionDialogComponent implements OnInit, OnDestroy {
    protected activeCartFacade: ActiveCartFacade;
    protected elementRef: ElementRef;
    protected intendedPickupLocationService: IntendedPickupLocationFacade;
    protected launchDialogService: LaunchDialogService;
    protected pickupLocationsSearchService: PickupLocationsSearchFacade;
    protected pickupOptionFacade: PickupOptionFacade;
    productCode: string;
    entryNumber: number;
    quantity: number;
    getHideOutOfStockState$: Observable<boolean>;
    loading: boolean;
    subscription: Subscription;
    isPDP: boolean;
    cartId: string;
    userId: string;
    readonly focusConfig: FocusConfig;
    readonly ICON_TYPE: typeof ICON_TYPE;
    /** The reason given closing the dialog window without selecting a location */
    readonly CLOSE_WITHOUT_SELECTION = "CLOSE_WITHOUT_SELECTION";
    /** The reason given closing the dialog window after selecting a location */
    readonly LOCATION_SELECTED = "LOCATION_SELECTED";
    constructor(activeCartFacade: ActiveCartFacade, elementRef: ElementRef, intendedPickupLocationService: IntendedPickupLocationFacade, launchDialogService: LaunchDialogService, pickupLocationsSearchService: PickupLocationsSearchFacade, pickupOptionFacade: PickupOptionFacade);
    handleClick(event: UIEvent): void;
    ngOnInit(): void;
    /**
     * Find the pickup points of service nearest to a place based on given search parameters.
     * @param locationSearchParams The latitude and longitude or free text search query to be used
     */
    onFindStores(locationSearchParams: LocationSearchParams): void;
    /**
     * Toggle whether locations without store should be shown or hidden.
     */
    onHideOutOfStock(): void;
    /**
     * Close the dialog window. This has additional side effects based upon whether
     * we are making a selection on the PDP or in the cart/during checkout.
     *
     * On the PDP:
     *
     * If the dialog is closed without making a selection, then the radio buttons
     * are left on pickup if there already exists an intended pickup location or
     * to delivery if not.
     *
     * Not on the PDP:
     *
     * If the window is closed after making a selection, then the cart is updated
     * to the the new selection.
     *
     * @param reason The reason the dialog window was closed
     */
    close(reason: string): void;
    /**
     * Change if the loading spinner should be displayed or not.
     * @param showSpinner Whether the loading spinner should be displayed
     */
    showSpinner(showSpinner: boolean): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PickupOptionDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PickupOptionDialogComponent, "cx-pickup-option-dialog", never, {}, {}, never, never, false, never>;
}
