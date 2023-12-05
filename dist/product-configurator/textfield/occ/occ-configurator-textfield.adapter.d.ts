import { HttpClient } from '@angular/common/http';
import { CartModification } from '@spartacus/cart/base/root';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorTextfieldAdapter } from '../core/connectors/configurator-textfield.adapter';
import { ConfiguratorTextfield } from '../core/model/configurator-textfield.model';
import * as i0 from "@angular/core";
export declare class OccConfiguratorTextfieldAdapter implements ConfiguratorTextfieldAdapter {
    protected http: HttpClient;
    protected occEndpointsService: OccEndpointsService;
    protected converterService: ConverterService;
    constructor(http: HttpClient, occEndpointsService: OccEndpointsService, converterService: ConverterService);
    createConfiguration(productCode: string, owner: CommonConfigurator.Owner): Observable<ConfiguratorTextfield.Configuration>;
    addToCart(parameters: ConfiguratorTextfield.AddToCartParameters): Observable<CartModification>;
    readConfigurationForCartEntry(parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters): Observable<ConfiguratorTextfield.Configuration>;
    readConfigurationForOrderEntry(parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters): Observable<ConfiguratorTextfield.Configuration>;
    updateConfigurationForCartEntry(parameters: ConfiguratorTextfield.UpdateCartEntryParameters): Observable<CartModification>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccConfiguratorTextfieldAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccConfiguratorTextfieldAdapter>;
}
