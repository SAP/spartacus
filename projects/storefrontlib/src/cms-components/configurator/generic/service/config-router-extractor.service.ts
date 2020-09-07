import { Injectable } from '@angular/core';
import {
  GenericConfigurator,
  GenericConfigUtilsService,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ConfigurationRouter } from './config-router-data';

/**
 * Service to extract the configuration owner key from the current route
 */
@Injectable({ providedIn: 'root' })
export class ConfigRouterExtractorService {
  protected routeFragmentConfigure = 'configure';
  protected routeFragmentConfigureOverview = 'configureOverview';
  constructor(
    protected configUtilsService: GenericConfigUtilsService,
    protected routingService: RoutingService
  ) {}

  extractRouterData(): Observable<ConfigurationRouter.Data> {
    return this.routingService.getRouterState().pipe(
      filter((routingData) => routingData.state.params.entityKey),
      //we don't need to cover the intermediate router states where a future route is already known.
      //only changes to the URL are relevant. Otherwise we get wrong hits where e.g. the config form fires although
      //the OV already loads
      filter((routingData) => routingData.nextState === undefined),
      map((routingData) => {
        const owner = this.createOwnerFromRouterState(routingData);

        const routerData: ConfigurationRouter.Data = {
          owner: owner,
          isOwnerCartEntry:
            owner.type === GenericConfigurator.OwnerType.CART_ENTRY,
          configuratorType: this.getConfiguratorTypeFromSemanticRoute(
            routingData.state.semanticRoute
          ),
          displayOnly: routingData.state.params.displayOnly,
          resolveIssues:
            routingData.state.queryParams?.resolveIssues === 'true',
          forceReload: routingData.state?.queryParams?.forceReload === 'true',
          pageType: routingData.state.semanticRoute.includes(
            this.routeFragmentConfigureOverview
          )
            ? ConfigurationRouter.PageType.OVERVIEW
            : ConfigurationRouter.PageType.CONFIGURATION,
        };

        return routerData;
      })
    );
  }

  createOwnerFromRouterState(
    routerState: RouterState
  ): GenericConfigurator.Owner {
    const owner: GenericConfigurator.Owner = {};
    const params = routerState.state.params;
    if (params.ownerType) {
      const entityKey = params.entityKey;
      owner.type = params.ownerType;

      owner.id = entityKey;
    } else {
      owner.type = GenericConfigurator.OwnerType.PRODUCT;
      owner.id = params.rootProduct;
    }
    this.configUtilsService.setOwnerKey(owner);
    return owner;
  }

  protected getConfiguratorTypeFromSemanticRoute(route: string): string {
    let configuratorType: string;
    if (route.includes(this.routeFragmentConfigureOverview)) {
      configuratorType = route
        .split(this.routeFragmentConfigureOverview)[1]
        .split('/')[0];
    } else if (route.includes(this.routeFragmentConfigure)) {
      configuratorType = route
        .split(this.routeFragmentConfigure)[1]
        .split('/')[0];
    }
    return configuratorType;
  }
}
