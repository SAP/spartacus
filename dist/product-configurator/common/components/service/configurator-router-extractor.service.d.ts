import { RouterState, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CommonConfigurator } from '../../core/model/common-configurator.model';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';
import { ConfiguratorRouter } from './configurator-router-data';
import * as i0 from "@angular/core";
/**
 * Service to extract the configuration owner key from the current route
 */
export declare class ConfiguratorRouterExtractorService {
    protected configUtilsService: CommonConfiguratorUtilsService;
    protected routingService: RoutingService;
    protected readonly ROUTE_FRAGMENT_CONFIGURE = "configure";
    protected readonly ROUTE_FRAGMENT_OVERVIEW = "configureOverview";
    constructor(configUtilsService: CommonConfiguratorUtilsService, routingService: RoutingService);
    extractRouterData(): Observable<ConfiguratorRouter.Data>;
    createOwnerFromRouterState(routerState: RouterState): CommonConfigurator.Owner;
    /**
     * Compiles the configurator type from the semantic route
     * @param semanticRoute Consists of a prefix that indicates if target is interactive configuration or overview and
     *                      the commerce configurator type as postfix.
     *                      Example: configureTEXTFIELD or configureOverviewCPQCONFIGURATOR
     * @returns Configurator type
     */
    protected getConfiguratorTypeFromSemanticRoute(semanticRoute: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorRouterExtractorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorRouterExtractorService>;
}
