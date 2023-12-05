import { Store } from '@ngrx/store';
import { WindowRef } from '@spartacus/core';
import { PickupLocationsSearchFacade, PointOfServiceNames, PreferredStoreFacade } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import { PickupInStoreConfig } from '../config';
import { StateWithPickupLocations } from '../store';
import * as i0 from "@angular/core";
/**
 * Service to store the user's preferred store for Pickup in Store in local storage.
 */
export declare class PreferredStoreService implements PreferredStoreFacade {
    protected config: PickupInStoreConfig;
    protected pickupLocationsSearchService: PickupLocationsSearchFacade;
    protected winRef: WindowRef;
    protected store: Store<StateWithPickupLocations>;
    constructor(config: PickupInStoreConfig, pickupLocationsSearchService: PickupLocationsSearchFacade, winRef: WindowRef, store: Store<StateWithPickupLocations>);
    /**
     * Gets the user's preferred store for Pickup in Store.
     * @returns the preferred store from the store
     */
    getPreferredStore$(): Observable<PointOfServiceNames | null>;
    /**
     * Sets the user's preferred store for Pickup in Store.
     * @param preferredStore the preferred store to set
     */
    setPreferredStore(preferredStore: PointOfServiceNames): void;
    /**
     * Clears the user's preferred store for Pickup in Store.
     */
    clearPreferredStore(): void;
    /**
     * Get the user's preferred store from local storage and only return it if it
     * has stock for the given product.
     * @param productCode The product code to check the stock level of
     */
    getPreferredStoreWithProductInStock(productCode: string): Observable<PointOfServiceNames>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PreferredStoreService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PreferredStoreService>;
}
