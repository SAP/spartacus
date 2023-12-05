import { HttpClient, HttpContext } from '@angular/common/http';
import { CartModification } from '@spartacus/cart/base/root';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { RulebasedConfiguratorAdapter } from '../../core/connectors/rulebased-configurator.adapter';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';
import * as i0 from "@angular/core";
export declare class VariantConfiguratorOccAdapter implements RulebasedConfiguratorAdapter {
    protected http: HttpClient;
    protected occEndpointsService: OccEndpointsService;
    protected converterService: ConverterService;
    protected configExpertModeService: ConfiguratorExpertModeService;
    constructor(http: HttpClient, occEndpointsService: OccEndpointsService, converterService: ConverterService, configExpertModeService: ConfiguratorExpertModeService);
    getConfiguratorType(): string;
    protected getExpModeRequested(): boolean;
    protected setExpModeActive(expMode: boolean): void;
    createConfiguration(owner: CommonConfigurator.Owner, configIdTemplate?: string, forceReset?: boolean): Observable<Configurator.Configuration>;
    readConfiguration(configId: string, groupId: string, configurationOwner: CommonConfigurator.Owner): Observable<Configurator.Configuration>;
    updateConfiguration(configuration: Configurator.Configuration): Observable<Configurator.Configuration>;
    addToCart(parameters: Configurator.AddToCartParameters): Observable<CartModification>;
    readConfigurationForCartEntry(parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters): Observable<Configurator.Configuration>;
    updateConfigurationForCartEntry(parameters: Configurator.UpdateConfigurationForCartEntryParameters): Observable<CartModification>;
    readConfigurationForOrderEntry(parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters): Observable<Configurator.Configuration>;
    readPriceSummary(configuration: Configurator.Configuration): Observable<Configurator.Configuration>;
    getConfigurationOverview(configId: string): Observable<Configurator.Overview>;
    updateConfigurationOverview(ovInput: Configurator.Overview): Observable<Configurator.Overview>;
    searchVariants(configId: string): Observable<Configurator.Variant[]>;
    /**
     * Prepares http context indicating that emulated user has to be added to the request in ASM mode
     *
     * The actual calls to the commerce backend will only be changed if the ASM setting
     * userIdHttpHeader:{
     *  enable:true
     * },
     * is active
     * @returns http context indicating that emulated user has to be added to the request in ASM mode
     */
    protected indicateSendUserForAsm(): HttpContext;
    static ɵfac: i0.ɵɵFactoryDeclaration<VariantConfiguratorOccAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VariantConfiguratorOccAdapter>;
}
