import { InjectionToken } from '@angular/core';
import { CartModification } from '@spartacus/cart/base/root';
import { CommonConfigurator, CommonConfiguratorUtilsService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorCoreConfig } from '../config/configurator-core.config';
import { Configurator } from '../model/configurator.model';
import { RulebasedConfiguratorAdapter } from './rulebased-configurator.adapter';
import * as i0 from "@angular/core";
export declare class RulebasedConfiguratorConnector {
    protected adapters: RulebasedConfiguratorAdapter[];
    protected configUtilsService: CommonConfiguratorUtilsService;
    protected config?: ConfiguratorCoreConfig | undefined;
    static CONFIGURATOR_ADAPTER_LIST: InjectionToken<RulebasedConfiguratorAdapter[]>;
    constructor(adapters: RulebasedConfiguratorAdapter[], configUtilsService: CommonConfiguratorUtilsService, config: ConfiguratorCoreConfig);
    /**
     * @deprecated since 6.3
     */
    constructor(adapters: RulebasedConfiguratorAdapter[], configUtilsService: CommonConfiguratorUtilsService);
    createConfiguration(owner: CommonConfigurator.Owner, configIdTemplate?: string, forceReset?: boolean): Observable<Configurator.Configuration>;
    readConfiguration(configId: string, groupId: string, configurationOwner: CommonConfigurator.Owner): Observable<Configurator.Configuration>;
    updateConfiguration(configuration: Configurator.Configuration): Observable<Configurator.Configuration>;
    addToCart(parameters: Configurator.AddToCartParameters): Observable<CartModification>;
    readConfigurationForCartEntry(parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters): Observable<Configurator.Configuration>;
    updateConfigurationForCartEntry(parameters: Configurator.UpdateConfigurationForCartEntryParameters): Observable<CartModification>;
    readConfigurationForOrderEntry(parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters): Observable<Configurator.Configuration>;
    readPriceSummary(configuration: Configurator.Configuration): Observable<Configurator.Configuration>;
    getConfigurationOverview(configuration: Configurator.Configuration): Observable<Configurator.Overview>;
    updateConfigurationOverview(configuration: Configurator.Configuration): Observable<Configurator.Overview>;
    searchVariants(configuration: Configurator.Configuration): Observable<Configurator.Variant[]>;
    protected getAdapter(configuratorType: string): RulebasedConfiguratorAdapter;
    protected isAdapterMatching(adapter: RulebasedConfiguratorAdapter, configuratorType: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RulebasedConfiguratorConnector, [null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RulebasedConfiguratorConnector>;
}
