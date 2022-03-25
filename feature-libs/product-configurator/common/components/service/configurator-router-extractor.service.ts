import { Injectable } from '@angular/core';
import { RouterState, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CommonConfigurator } from '../../core/model/common-configurator.model';
import { CommonConfiguratorUtilsService } from '../../shared/utils/common-configurator-utils.service';
import { ConfiguratorModelUtils } from '../../shared/utils/configurator-model-utils';
import { ConfiguratorRouter } from './configurator-router-data';

/**
 * Service to extract the configuration owner key from the current route
 */
@Injectable({ providedIn: 'root' })
export class ConfiguratorRouterExtractorService {
  protected readonly ROUTE_FRAGMENT_CONFIGURE = 'configure';
  protected readonly ROUTE_FRAGMENT_OVERVIEW = 'configureOverview';
  constructor(
    protected configUtilsService: CommonConfiguratorUtilsService,
    protected routingService: RoutingService
  ) {}

  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return this.routingService.getRouterState().pipe(
      filter((routingData) => routingData.state.params.entityKey),
      //we don't need to cover the intermediate router states where a future route is already known.
      //only changes to the URL are relevant. Otherwise we get wrong hits where e.g. the config form fires although
      //the OV already loads
      filter((routingData) => routingData.nextState === undefined),
      map((routingData) => {
        const owner = this.createOwnerFromRouterState(routingData);
        const semanticRoute = routingData.state.semanticRoute;
        const routerData: ConfiguratorRouter.Data = {
          owner: owner,
          isOwnerCartEntry:
            owner.type === CommonConfigurator.OwnerType.CART_ENTRY,
          displayOnly: routingData.state.params.displayOnly,
          resolveIssues:
            routingData.state.queryParams?.resolveIssues === 'true',
          forceReload: routingData.state.queryParams?.forceReload === 'true',
          pageType:
            semanticRoute &&
            semanticRoute.includes(this.ROUTE_FRAGMENT_OVERVIEW)
              ? ConfiguratorRouter.PageType.OVERVIEW
              : ConfiguratorRouter.PageType.CONFIGURATION,
        };

        return routerData;
      })
    );
  }

  createOwnerFromRouterState(
    routerState: RouterState
  ): CommonConfigurator.Owner {
    const owner: CommonConfigurator.Owner =
      ConfiguratorModelUtils.createInitialOwner();
    const params = routerState.state.params;
    if (params.ownerType) {
      const entityKey = params.entityKey;
      owner.type = params.ownerType;

      owner.id = entityKey;
    } else {
      owner.type = CommonConfigurator.OwnerType.PRODUCT;
      owner.id = params.rootProduct;
    }
    const semanticRoute = routerState.state.semanticRoute;
    if (semanticRoute) {
      const configuratorType =
        this.getConfiguratorTypeFromSemanticRoute(semanticRoute);
      owner.configuratorType = configuratorType;
    }
    this.configUtilsService.setOwnerKey(owner);
    return owner;
  }

  /**
   * Compiles the configurator type from the semantic route
   * @param semanticRoute Consists of a prefix that indicates if target is interactive configuration or overview and
   *                      the commerce configurator type as postfix.
   *                      Example: configureTEXTFIELD or configureOverviewCPQCONFIGURATOR
   * @returns Configurator type
   */
  protected getConfiguratorTypeFromSemanticRoute(
    semanticRoute: string
  ): string {
    if (semanticRoute.startsWith(this.ROUTE_FRAGMENT_OVERVIEW)) {
      return semanticRoute.split(this.ROUTE_FRAGMENT_OVERVIEW)[1];
    } else if (semanticRoute.startsWith(this.ROUTE_FRAGMENT_CONFIGURE)) {
      return semanticRoute.split(this.ROUTE_FRAGMENT_CONFIGURE)[1];
    } else {
      throw new Error('Not able to detemine configurator type');
    }
  }
}
