import { RoutingConfig } from '../../../routing/configurable-routes/config/routing-config';
import { UrlParsingService } from '../../../routing/configurable-routes/url-translation/url-parsing.service';
import * as i0 from "@angular/core";
export declare class AuthFlowRoutesService {
    protected config: RoutingConfig;
    protected urlParsingService: UrlParsingService;
    constructor(config: RoutingConfig, urlParsingService: UrlParsingService);
    protected _authFlowPaths: string[];
    /**
     * List of paths that are part user auth flow
     */
    protected get authFlowPaths(): string[];
    /**
     * Tells whether the given URL is a part of the user auth flow
     */
    isAuthFlow(url: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthFlowRoutesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthFlowRoutesService>;
}
