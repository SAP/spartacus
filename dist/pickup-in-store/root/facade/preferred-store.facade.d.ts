import { Observable } from 'rxjs';
import { PointOfServiceNames } from '../model/point-of-service-names.model';
import * as i0 from "@angular/core";
/**
 * Service to store the user's preferred store for Pickup in Store in local storage.
 */
export declare abstract class PreferredStoreFacade {
    /**
     * Gets the user's preferred store for Pickup in Store.
     * @returns the preferred store from the store
     */
    abstract getPreferredStore$(): Observable<PointOfServiceNames | null>;
    /**
     * Sets the user's preferred store for Pickup in Store.
     * @param preferredStore the preferred store to set
     */
    abstract setPreferredStore(preferredStore: PointOfServiceNames): void;
    /**
     * Clears the user's preferred store for Pickup in Store.
     */
    abstract clearPreferredStore(): void;
    /**
     * Get the user's preferred store from local storage and only return it if it
     * has stock for the given product.
     * @param productCode The product code to check the stock level of
     */
    abstract getPreferredStoreWithProductInStock(productCode: string): Observable<PointOfServiceNames>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PreferredStoreFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PreferredStoreFacade>;
}
