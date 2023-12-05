import { Store } from '@ngrx/store';
import { AugmentedPointOfService, IntendedPickupLocationFacade, PickupOption } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import { StateWithPickupLocations } from '../store/pickup-location-state';
import * as i0 from "@angular/core";
/**
 * Store the Point of Service a user wants to collect a product from before it is added to the cart.
 */
export declare class IntendedPickupLocationService implements IntendedPickupLocationFacade {
    protected store: Store<StateWithPickupLocations>;
    constructor(store: Store<StateWithPickupLocations>);
    getIntendedLocation(productCode: string): Observable<AugmentedPointOfService | undefined>;
    getPickupOption(productCode: string): Observable<PickupOption>;
    setPickupOption(productCode: string, pickupOption: PickupOption): void;
    setIntendedLocation(productCode: string, location: AugmentedPointOfService): void;
    removeIntendedLocation(productCode: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IntendedPickupLocationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IntendedPickupLocationService>;
}
