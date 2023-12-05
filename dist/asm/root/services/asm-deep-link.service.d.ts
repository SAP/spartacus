import { RoutingService, WindowRef } from '@spartacus/core';
import { AsmEnablerService } from './asm-enabler.service';
import { AsmDeepLinkParameters } from '../model/asm.models';
import * as i0 from "@angular/core";
export declare class AsmDeepLinkService {
    protected routingService: RoutingService;
    protected winRef: WindowRef;
    protected asmEnablerService: AsmEnablerService;
    protected searchParams: URLSearchParams;
    constructor(routingService: RoutingService, winRef: WindowRef, asmEnablerService: AsmEnablerService);
    /**
     * check whether try to emulate customer from deeplink
     */
    isEmulateInURL(): boolean;
    /**
     * Returns a deep link parameter value if it is in the url.
     */
    getSearchParameter(key: string): string | undefined;
    /**
     * Handles the navigation based on deep link parameters in the URL
     * or passed parameters.
     */
    handleNavigation(parameters?: AsmDeepLinkParameters): void;
    /**
     * Returns valid deep link parameters in the url.
     */
    getParamsInUrl(): AsmDeepLinkParameters;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmDeepLinkService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmDeepLinkService>;
}
