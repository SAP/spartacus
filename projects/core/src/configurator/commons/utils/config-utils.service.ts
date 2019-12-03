import { Injectable } from '@angular/core';
import { Configurator } from '../../../model/configurator.model';

/**
 * Utilities: Creating the key for a configuration owner object
 */
@Injectable({ providedIn: 'root' })
export class ConfigUtilsService {
  setOwnerKey(owner: Configurator.Owner) {
    if (owner.type === Configurator.OwnerType.PRODUCT) {
      if (!owner.productCode) {
        throw new Error('We expect a product code!');
      }
      owner.key = owner.type + '/' + owner.productCode;
    } else if (owner.type === Configurator.OwnerType.CART_ENTRY) {
      if (!owner.documentEntryId) {
        throw new Error('We expect a document entry Id!');
      }
      owner.key = owner.type + '/' + owner.documentEntryId;
    } else {
      throw new Error('We expect an owner type!');
    }
  }
}
