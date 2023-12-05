import { HttpClient } from '@angular/common/http';
import { ConverterService } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Observable } from 'rxjs';
import { CpqConfiguratorEndpointService } from './cpq-configurator-endpoint.service';
import { Cpq } from '../common/cpq.models';
import * as i0 from "@angular/core";
export declare class CpqConfiguratorRestService {
    protected http: HttpClient;
    protected converterService: ConverterService;
    protected endpointService: CpqConfiguratorEndpointService;
    constructor(http: HttpClient, converterService: ConverterService, endpointService: CpqConfiguratorEndpointService);
    /**
     * Creates a new runtime configuration for the given product id
     * and read this default configuration from the CPQ system.
     *
     * @param {string} productSystemId - Product system ID
     * @returns {Observable<Configurator.Configuration>} - Created configuration
     */
    createConfiguration(productSystemId: string): Observable<Configurator.Configuration>;
    /**
     * Retrieves a configuration from the CPQ system by its configuration ID and for a certain tab.
     *
     * @param {string} configId - Configuration ID
     * @param {string} tabId - Tab ID
     * @returns {Observable<Configurator.Configuration>} - Retrieved configuration
     */
    readConfiguration(configId: string, tabId?: string): Observable<Configurator.Configuration>;
    /**
     * Retrieves an overview for a certain configuration by its configuration ID.
     *
     * @param {string} configId - Configuration ID
     * @returns {Observable<Configurator.Overview>} - Retrieved overview
     */
    readConfigurationOverview(configId: string): Observable<Configurator.Overview>;
    /**
     * This method is actually a workaround until CPQ provides and API to fetch
     * all selected attributes / attribute values grouped by all tabs.
     * It will fire a request for each tab to collect all required data.
     */
    protected getConfigurationWithAllTabsAndAttributes(configId: string): Observable<Cpq.Configuration>;
    protected mergeTabResults(tabReqResultList: Cpq.Configuration[]): Cpq.Configuration;
    /**
     * Updates an attribute of the runtime configuration for the given configuration id and attribute code
     * and read this default configuration from the CPQ system.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {Observable<Configurator.Configuration>} - Updated configuration
     */
    updateAttribute(configuration: Configurator.Configuration): Observable<Configurator.Configuration>;
    /**
     * Updates a quantity for an attribute of the runtime configuration for the given configuration id and attribute code
     * and read this default configuration from the CPQ system.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {Observable<Configurator.Configuration>} - Updated configuration
     */
    updateValueQuantity(configuration: Configurator.Configuration): Observable<Configurator.Configuration>;
    protected callUpdateValue(updateValue: Cpq.UpdateValue): Observable<any>;
    protected callConfigurationInit(productSystemId: string): Observable<Cpq.ConfigurationCreatedResponseData>;
    protected callConfigurationDisplay(configId: string, tabId?: string): Observable<Cpq.Configuration>;
    protected callUpdateAttribute(updateAttribute: Cpq.UpdateAttribute): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqConfiguratorRestService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqConfiguratorRestService>;
}
