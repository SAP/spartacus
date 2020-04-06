import { Injectable } from '@angular/core';
import {
  GenericConfigurator,
  GenericConfigUtilsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * Service to extract the configuration owner key from the current route
 */
@Injectable({ providedIn: 'root' })
export class ConfigRouterExtractorService {
  constructor(private configUtilsService: GenericConfigUtilsService) {}

  extractConfigurationOwner(
    routingService: RoutingService
  ): Observable<GenericConfigurator.Owner> {
    return routingService.getRouterState().pipe(
      filter((routingData) => routingData.state.params.entityKey),
      map((routingData) => {
        const params = routingData.state.params;
        const owner: GenericConfigurator.Owner = {};

        if (params.ownerType) {
          const entityKey = params.entityKey;
          owner.type = params.ownerType;
          owner.id = entityKey;
          owner.hasObsoleteState =
            routingData.state?.queryParams?.forceReload === 'true';
        } else {
          owner.type = GenericConfigurator.OwnerType.PRODUCT;
          owner.id = params.rootProduct;
        }
        this.configUtilsService.setOwnerKey(owner);
        return owner;
      })
    );
  }

  isOwnerCartEntry(routingService: RoutingService): Observable<any> {
    return routingService.getRouterState().pipe(
      filter((routingData) => routingData.state.params.entityKey),
      map((routingData) => {
        const params = routingData.state.params;
        return {
          isOwnerCartEntry:
            params.ownerType === GenericConfigurator.OwnerType.CART_ENTRY,
        };
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

  isOverview(routingService: RoutingService): Observable<any> {
    return routingService.getRouterState().pipe(
      map((routingData) => ({
        isOverview: routingData.state.url.includes('configureOverview'),
      }))
    );
  }

  isConfigurator(routingService: RoutingService): Observable<any> {
    return routingService.getRouterState().pipe(
      map((routingData) => ({
        isConfigurator:
          routingData.state.url.includes('configure') &&
          !routingData.state.url.includes('configureOverview'),
      }))
    );
  }

  getConfiguratorType(routingService: RoutingService): Observable<string> {
    return routingService
      .getRouterState()
      .pipe(
        map((routerState) =>
          this.getConfiguratorTypeFromUrl(routerState.state.url)
        )
      );
  }
}
