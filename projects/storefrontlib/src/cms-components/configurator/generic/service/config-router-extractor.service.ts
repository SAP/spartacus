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
  constructor(
    private configUtilsService: GenericConfigUtilsService,
    private routingService: RoutingService
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
          configuratorType: this.getConfiguratorTypeFromUrl(
            routingData.state.url
          ),
          displayOnly: routingData.state.params.displayOnly,
          resolveIssues:
            routingData.state.queryParams?.resolveIssues === 'true',
          forceReload: routingData.state?.queryParams?.forceReload === 'true',
          pageType: routingData.state.url.includes('configureOverview')
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

  getConfiguratorTypeFromUrl(url: string): string {
    let configuratorType: string;
    if (url.includes('configureOverview')) {
      configuratorType = url.split('configureOverview')[1].split('/')[0];
    } else if (url.includes('configure')) {
      configuratorType = url.split('configure')[1].split('/')[0];
    }
    return configuratorType;
  }
}
