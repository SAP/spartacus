import { CdsConfig } from '../config/cds-config';
import * as i0 from "@angular/core";
export declare class CdsEndpointsService {
    private cdsConfig;
    constructor(cdsConfig: CdsConfig);
    getUrl(endpoint: string, urlParams?: object, queryParams?: object): string;
    private getEndpoint;
    private getBaseEndpoint;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdsEndpointsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdsEndpointsService>;
}
