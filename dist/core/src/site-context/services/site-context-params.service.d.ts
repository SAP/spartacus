import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggerService } from '../../logger';
import { SiteContextConfig } from '../config/site-context-config';
import { SiteContext } from '../facade/site-context.interface';
import { ContextServiceMap } from '../providers/context-service-map';
import * as i0 from "@angular/core";
export declare class SiteContextParamsService {
    private config;
    private injector;
    private serviceMap;
    protected logger: LoggerService;
    constructor(config: SiteContextConfig, injector: Injector, serviceMap: ContextServiceMap);
    getContextParameters(): string[];
    getUrlEncodingParameters(): string[];
    getParamValues(param: string): string[];
    getParamDefaultValue(param: string): string | undefined;
    getSiteContextService(param: string): SiteContext<any> | undefined;
    getValue(param: string): string | undefined;
    setValue(param: string, value: string): void;
    /**
     * Get active values for all provided context parameters
     *
     * @param params Context parameters
     *
     * @returns Observable emitting array of all passed active context values
     */
    getValues(params: string[]): Observable<Array<string>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SiteContextParamsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SiteContextParamsService>;
}
