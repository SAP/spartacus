import { Injectable } from '@angular/core';
import {
  GenericConfigurator,
  GenericConfigUtilsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ConfigurationRouter } from './config-router-data';
let i = 1;
let j = 1;
/**
 * Service to extract the configuration owner key from the current route
 */
@Injectable({ providedIn: 'root' })
export class ConfigRouterExtractorService {
  constructor(private configUtilsService: GenericConfigUtilsService) {}

  extractRouterData(
    routingService: RoutingService
  ): Observable<ConfigurationRouter.Data> {
    return routingService.getRouterState().pipe(
      tap(() => {
        i = i + 1;
      }),
      filter((routingData) => routingData.state.params.entityKey),
      filter((routingData) => routingData.nextState === undefined),
      map((routingData) => {
        j = j + 1;
        const params = routingData.state.params;

        const owner: GenericConfigurator.Owner = {};
        const routerData: ConfigurationRouter.Data = {
          owner: owner,
          isOwnerCartEntry: false,
          configuratorType: this.getConfiguratorTypeFromUrl(
            routingData.state.url
          ),
        };
        if (params.ownerType) {
          const entityKey = params.entityKey;
          owner.type = params.ownerType;
          if (owner.type === GenericConfigurator.OwnerType.CART_ENTRY) {
            routerData.isOwnerCartEntry = true;
          }
          owner.id = entityKey;
          owner.hasObsoleteState =
            routingData.state?.queryParams?.forceReload === 'true';
        } else {
          owner.type = GenericConfigurator.OwnerType.PRODUCT;
          owner.id = params.rootProduct;
        }
        this.configUtilsService.setOwnerKey(owner);

        if (routingData.state.url.includes('configureOverview')) {
          routerData.pageType = ConfigurationRouter.PageType.OVERVIEW;
        } else {
          routerData.pageType = ConfigurationRouter.PageType.CONFIGURATION;
        }
        return routerData;
      })
    );
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
