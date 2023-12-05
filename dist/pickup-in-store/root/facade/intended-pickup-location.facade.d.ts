import { Observable } from 'rxjs';
import { AugmentedPointOfService, PickupOption } from '../model/pickup-option.model';
import * as i0 from "@angular/core";
/**
 * Store the Point of Service a user wants to collect a product from before it is added to the cart.
 */
export declare abstract class IntendedPickupLocationFacade {
    /**
     * Get the Point of Service a user wants to collect a product from before it is added to the cart.
     * @param productCode The product code of the product the user wants to collect.
     */
    abstract getIntendedLocation(productCode: string): Observable<AugmentedPointOfService | undefined>;
    /**
     * Set the Point of Service a user wants to collect a product from before it is added to the cart.
     * @param productCode The product code of the product the user wants to collect.
     * @param location The Point of Service the user wants to collect the product from.
     */
    abstract setIntendedLocation(productCode: string, location: AugmentedPointOfService): void;
    /**
     * Remove the Point of Service a user wanted to collect a product from before it was to be added to the cart.
     * @param productCode The product code of the product the user wants to collect.
     */
    abstract removeIntendedLocation(productCode: string): void;
    /**
     * Get the Pickup Option ('pickup' or 'delivery') a user wants
     * @param productCode The product code of the product the user wants to collect.
     */
    abstract getPickupOption(productCode: string): Observable<PickupOption>;
    /**
     * Set the Pickup Option ('pickup' or 'delivery') a user wants
     * @param productCode The product code of the product the user wants to set the pickup location for.
     */
    abstract setPickupOption(productCode: string, pickupOption: PickupOption): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IntendedPickupLocationFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IntendedPickupLocationFacade>;
}
