import { Injectable } from '@angular/core';
import {
  Configurator,
  ConfigUtilsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * Service to extract the configuration owner key from the current route
 */
@Injectable({ providedIn: 'root' })
export class ConfigRouterExtractorService {
  constructor(private configUtilsService: ConfigUtilsService) {}

  extractConfigurationOwner(
    routingService: RoutingService
  ): Observable<Configurator.Owner> {
    return routingService.getRouterState().pipe(
      filter(routingData => routingData.state.params.entityKey),
      map(routingData => {
        const params = routingData.state.params;
        const owner: Configurator.Owner = {};
        if (params.ownerType) {
          const entityKey = params.entityKey;
          owner.type = params.ownerType;
          owner.id = entityKey;
        } else {
          owner.type = Configurator.OwnerType.PRODUCT;
          owner.id = params.rootProduct;
        }
        this.configUtilsService.setOwnerKey(owner);
        return owner;
      })
    );
  }

  hasBeenAddedToCart(routingService: RoutingService): Observable<any> {
    return routingService.getRouterState().pipe(
      filter(routingData => routingData.state.params.entityKey),
      map(routingData => {
        const params = routingData.state.params;
        return {
          hasBeenAdded: params.ownerType === Configurator.OwnerType.CART_ENTRY,
        };
      })
    );
  }
}
