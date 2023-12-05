import { CartModification } from '@spartacus/cart/base/root';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Configurator, RulebasedConfiguratorAdapter } from '@spartacus/product-configurator/rulebased';
import { Observable } from 'rxjs';
import { CpqConfiguratorOccService } from './../occ/cpq-configurator-occ.service';
import { CpqConfiguratorRestService } from './cpq-configurator-rest.service';
import * as i0 from "@angular/core";
export declare class CpqConfiguratorRestAdapter implements RulebasedConfiguratorAdapter {
    protected cpqRestService: CpqConfiguratorRestService;
    protected cpqOccService: CpqConfiguratorOccService;
    constructor(cpqRestService: CpqConfiguratorRestService, cpqOccService: CpqConfiguratorOccService);
    getConfiguratorType(): string;
    supportsCpqOverOcc(): boolean;
    createConfiguration(owner: CommonConfigurator.Owner): Observable<Configurator.Configuration>;
    readConfiguration(configId: string, groupId: string, owner: CommonConfigurator.Owner): Observable<Configurator.Configuration>;
    updateConfiguration(configuration: Configurator.Configuration): Observable<Configurator.Configuration>;
    updateConfigurationOverview(): Observable<Configurator.Overview>;
    addToCart(parameters: Configurator.AddToCartParameters): Observable<CartModification>;
    readConfigurationForCartEntry(parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters): Observable<Configurator.Configuration>;
    updateConfigurationForCartEntry(parameters: Configurator.UpdateConfigurationForCartEntryParameters): Observable<CartModification>;
    readConfigurationForOrderEntry(parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters): Observable<Configurator.Configuration>;
    readPriceSummary(configuration: Configurator.Configuration): Observable<Configurator.Configuration>;
    getConfigurationOverview(configId: string): Observable<Configurator.Overview>;
    searchVariants(): Observable<Configurator.Variant[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqConfiguratorRestAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqConfiguratorRestAdapter>;
}
