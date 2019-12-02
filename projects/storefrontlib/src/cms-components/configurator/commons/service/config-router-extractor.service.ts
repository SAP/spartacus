import { Injectable } from '@angular/core';
import {
  Configurator,
  ConfigUtilsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
      map(routingData => {
        const params = routingData.state.params;
        const owner: Configurator.Owner = {};
        if (params.ownerType) {
          const entityKey = params.entityKey;
          owner.type = params.ownerType;
          if (owner.type === Configurator.OwnerType.PRODUCT) {
            owner.productCode = entityKey;
          } else {
            owner.documentEntryId = entityKey;
          }
        } else {
          owner.type = Configurator.OwnerType.PRODUCT;
          owner.productCode = params.rootProduct;
        }
        this.configUtilsService.setOwnerKey(owner);
        return owner;
      })
    );
  }
}
