import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * To implement custom solution provide your own implementation and customize services that use ConfiguratorQuantityService
 */
export declare class ConfiguratorQuantityService {
    private _quantity;
    /**
     * Sets the configuration quantity.
     *
     * @param quantity
     */
    setQuantity(quantity: number): void;
    /**
     * Retrieves the configuration quantity.
     *
     * @returns {Observable<number>} - Configuration quantity.
     */
    getQuantity(): Observable<number>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorQuantityService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorQuantityService>;
}
