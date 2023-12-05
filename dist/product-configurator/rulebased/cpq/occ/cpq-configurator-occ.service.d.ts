import { HttpClient } from '@angular/common/http';
import { CartModification } from '@spartacus/cart/base/root';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Observable } from 'rxjs';
import { Cpq } from '../common/cpq.models';
import * as i0 from "@angular/core";
export declare class CpqConfiguratorOccService {
    protected http: HttpClient;
    protected occEndpointsService: OccEndpointsService;
    protected converterService: ConverterService;
    constructor(http: HttpClient, occEndpointsService: OccEndpointsService, converterService: ConverterService);
    addToCart(parameters: Configurator.AddToCartParameters): Observable<CartModification>;
    updateCartEntry(parameters: Configurator.UpdateConfigurationForCartEntryParameters): Observable<CartModification>;
    getConfigIdForCartEntry(parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters): Observable<string>;
    getConfigIdForOrderEntry(parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters): Observable<string>;
    /**
     * Creates a new default runtime configuration for the given product id
     * and read it from the CPQ system over OCC.
     *
     * @param {string} productSystemId - Product system ID
     * @returns {Observable<Configurator.Configuration>} - Created configuration
     */
    createConfiguration(productSystemId: string): Observable<Configurator.Configuration>;
    /**
     * Retrieves a configuration from the CPQ system over OCC by its configuration ID and for a certain tab.
     *
     * @param {string} configId - Configuration ID
     * @param {string} tabId - Tab ID
     * @returns {Observable<Configurator.Configuration>} - Retrieved configuration
     */
    readConfiguration(configId: string, tabId?: string): Observable<Configurator.Configuration>;
    /**
     * Retrieves a configuration overview from the CPQ system over OCC by its configuration ID.
     *
     * @param {string} configId - Configuration ID
     * @returns {Observable<Configurator.Overview>} - Retrieved overview
     */
    readConfigurationOverview(configId: string): Observable<Configurator.Overview>;
    /**
     * Updates an attribute of the runtime configuration for the given configuration id and attribute code
     * and read the desired configuration tab from the CPQ system over OCC.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {Observable<Configurator.Configuration>} - Updated configuration
     */
    updateAttribute(configuration: Configurator.Configuration): Observable<Configurator.Configuration>;
    /**
     * Updates a quantity for an attribute of the runtime configuration for the given configuration id and attribute code
     * and read the desired configuration tab from the CPQ system over OCC.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {Observable<Configurator.Configuration>} - Updated configuration
     */
    updateValueQuantity(configuration: Configurator.Configuration): Observable<Configurator.Configuration>;
    /**
     * Retrieves a configuration assigned to a cart entry.
     *
     * @param {CommonConfigurator.ReadConfigurationFromCartEntryParameters} parameters - Cart entry parameters
     * @returns {Observable<Configurator.Configuration>} - Retrieved configuration
     */
    readConfigurationForCartEntry(parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters): Observable<Configurator.Configuration>;
    /**
     * Retrieves a configuration assigned to an order entry.
     *
     * @param {CommonConfigurator.ReadConfigurationFromOrderEntryParameters} parameters - Order entry parameters
     * @returns {Observable<Configurator.Configuration>} - Retrieved configuration
     */
    readConfigurationForOrderEntry(parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters): Observable<Configurator.Configuration>;
    protected callCreateConfiguration(productSystemId: string): Observable<Cpq.Configuration>;
    protected callReadConfiguration(configId: string, tabId?: string): Observable<Cpq.Configuration>;
    protected callReadConfigurationOverview(configId: string): Observable<Cpq.Configuration>;
    protected callUpdateAttribute(updateAttribute: Cpq.UpdateAttribute): Observable<Cpq.Configuration>;
    protected callUpdateValue(updateValue: Cpq.UpdateValue): Observable<Cpq.Configuration>;
    protected callReadConfigurationForCartEntry(parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters): Observable<Cpq.Configuration>;
    protected callReadConfigurationForOrderEntry(parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters): Observable<Cpq.Configuration>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqConfiguratorOccService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqConfiguratorOccService>;
}
