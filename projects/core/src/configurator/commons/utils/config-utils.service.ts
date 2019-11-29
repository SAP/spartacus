import { Injectable } from '@angular/core';
import { Configurator } from '@spartacus/core';

/**
 * Service to extract the configuration owner key from the current route
 */
@Injectable({ providedIn: 'root' })
export class ConfigUtilsService {
  setOwnerKey(owner: Configurator.Owner) {
    if (owner.type === Configurator.OwnerType.PRODUCT) {
      owner.key = owner.type + '/' + owner.productCode;
    } else {
      owner.key = owner.type + '/' + owner.documentEntryId;
    }
  }
}
