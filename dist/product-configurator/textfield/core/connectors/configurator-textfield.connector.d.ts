import { CartModification } from '@spartacus/cart/base/root';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';
import { ConfiguratorTextfieldAdapter } from './configurator-textfield.adapter';
import * as i0 from "@angular/core";
export declare class ConfiguratorTextfieldConnector {
    protected adapter: ConfiguratorTextfieldAdapter;
    constructor(adapter: ConfiguratorTextfieldAdapter);
    /**
     * Creates default configuration for a product that is textfield-configurable
     * @param productCode Product code
     * @param owner Owner of the configuration
     * @returns Observable of product configurations
     */
    createConfiguration(productCode: string, owner: CommonConfigurator.Owner): Observable<ConfiguratorTextfield.Configuration>;
    /**
     * Reads an existing configuration for a cart entry
     * @param parameters Attributes needed to read a product configuration for a cart entry
     * @returns Observable of product configurations
     */
    readConfigurationForCartEntry(parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters): Observable<ConfiguratorTextfield.Configuration>;
    /**
     * Reads an existing configuration for an order entry
     * @param {CommonConfigurator.ReadConfigurationFromOrderEntryParameters} parameters Attributes needed to read a product configuration for an order entry
     * @returns {Observable<ConfiguratorTextfield.Configuration>} Observable of product configurations
     */
    readConfigurationForOrderEntry(parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters): Observable<ConfiguratorTextfield.Configuration>;
    /**
     * Updates a configuration that is attached to a cart entry
     * @param parameters Attributes needed to update a cart entries' configuration
     * @returns Observable of cart modifications
     */
    updateConfigurationForCartEntry(parameters: ConfiguratorTextfield.UpdateCartEntryParameters): Observable<CartModification>;
    /**
     * Adds a textfield-configurable product to the cart, and passes along its configuration
     * @param parameters Attributes needed to add a textfield product along with its configuration to the cart
     * @returns Observable of cart modifications
     */
    addToCart(parameters: ConfiguratorTextfield.AddToCartParameters): Observable<CartModification>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorTextfieldConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorTextfieldConnector>;
}
