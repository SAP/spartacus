import { HttpHeaders } from '@angular/common/http';
import { LoggerService } from '@spartacus/core';
import { CpqConfiguratorEndpointConfig } from './cpq-configurator-endpoint.config';
import * as i0 from "@angular/core";
export declare class CpqConfiguratorEndpointService {
    protected config: CpqConfiguratorEndpointConfig;
    protected logger: LoggerService;
    constructor(config: CpqConfiguratorEndpointConfig);
    /**
     * header attribute to a mark cpq related requests, so that they can be picked up by the {@link CpqConfiguratorRestInterceptor}
     */
    readonly CPQ_MARKER_HEADER: {
        headers: HttpHeaders;
    };
    buildUrl(endpointName: string, urlParams?: Object, queryParams?: [{
        name: string;
        value: string;
    }]): string;
    protected appendQueryParameters(url: string, parameters: [{
        name: string;
        value: string;
    }]): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqConfiguratorEndpointService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqConfiguratorEndpointService>;
}
