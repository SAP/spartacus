import { RoutingConfigService } from '../routing-config.service';
import { UrlCommands } from './url-command';
import { UrlParsingService } from './url-parsing.service';
import * as i0 from "@angular/core";
export declare class SemanticPathService {
    protected routingConfigService: RoutingConfigService;
    protected urlParser: UrlParsingService;
    readonly ROOT_URL: string[];
    constructor(routingConfigService: RoutingConfigService, urlParser: UrlParsingService);
    /**
     * Returns the first path alias configured for a given route name. It adds `/` at the beginning.
     */
    get(routeName: string): string | undefined;
    /**
     * Transforms the array of url commands. Each command can be:
     * a) string - will be left untouched
     * b) object { cxRoute: <route name> } - will be replaced with semantic path
     * c) object { cxRoute: <route name>, params: { ... } } - same as above, but with passed params
     *
     * If the first command is the object with the `cxRoute` property, returns an absolute url (with the first element of the array `'/'`)
     */
    transform(commands: UrlCommands): any[];
    private isRouteCommand;
    private shouldOutputAbsolute;
    private generateUrlPart;
    private standarizeRouteCommand;
    private provideParamsValues;
    private findPathWithFillableParams;
    private getParams;
    private getMappedParamName;
    static ɵfac: i0.ɵɵFactoryDeclaration<SemanticPathService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SemanticPathService>;
}
