import { HttpParams, HttpParamsOptions } from '@angular/common/http';
import { LoggerService } from '../../logger';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { OccConfig } from '../config/occ-config';
import * as i0 from "@angular/core";
export interface BaseOccUrlProperties {
    baseUrl?: boolean;
    prefix?: boolean;
    baseSite?: boolean;
}
export interface DynamicAttributes {
    urlParams?: object;
    queryParams?: object;
    scope?: string;
}
export declare class OccEndpointsService {
    private config;
    private baseSiteService;
    private _activeBaseSite;
    private get activeBaseSite();
    protected logger: LoggerService;
    constructor(config: OccConfig, baseSiteService: BaseSiteService);
    /**
     * Returns the value configured for a specific endpoint
     *
     * @param endpointKey the configuration key for the endpoint to return
     * @param scope endpoint configuration scope
     */
    getRawEndpointValue(endpoint: string, scope?: string): string;
    /**
     * Returns true when the endpoint is configured
     *
     * @param endpointKey the configuration key for the endpoint to return
     * @param scope endpoint configuration scope
     */
    isConfigured(endpoint: string, scope?: string): boolean;
    /**
     * Returns base OCC endpoint (baseUrl + prefix + baseSite) base on provided values
     *
     * @param baseUrlProperties Specify properties to not add to the url (baseUrl, prefix, baseSite)
     */
    getBaseUrl(baseUrlProperties?: BaseOccUrlProperties): string;
    /**
     * Returns a fully qualified OCC Url
     *
     * @param endpoint Name of the OCC endpoint key
     * @param attributes Dynamic attributes used to build the url
     * @param propertiesToOmit Specify properties to not add to the url (baseUrl, prefix, baseSite)
     */
    buildUrl(endpoint: string, attributes?: DynamicAttributes, propertiesToOmit?: BaseOccUrlProperties): string;
    protected getHttpParamsFromQueryParams(queryParams: any, options: HttpParamsOptions): HttpParams;
    private getEndpointFromConfig;
    private getEndpointForScope;
    /**
     * Add the base OCC url properties to the specified endpoint string
     *
     * @param endpointString String value for the url endpoint
     * @param propertiesToOmit Specify properties to not add to the url (baseUrl, prefix, baseSite)
     */
    private buildUrlFromEndpointString;
    private getPrefix;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccEndpointsService, [null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccEndpointsService>;
}
