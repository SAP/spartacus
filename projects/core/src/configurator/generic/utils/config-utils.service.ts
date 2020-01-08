import { Injectable } from '@angular/core';
import { GenericConfigurator } from '../../../model/generic-configurator.model';

/**
 * Utilities: Creating the key for a configuration owner object
 */
@Injectable({ providedIn: 'root' })
export class GenericConfigUtilsService {
  setOwnerKey(owner: GenericConfigurator.Owner) {
    if (owner.type === GenericConfigurator.OwnerType.PRODUCT) {
      if (!owner.id) {
        throw new Error('We expect a product code!');
      }
    } else if (owner.type === GenericConfigurator.OwnerType.CART_ENTRY) {
      if (!owner.id) {
        throw new Error('We expect a document entry Id!');
      }
    } else {
      throw new Error('We expect an owner type!');
    }
    owner.key = owner.type + '/' + owner.id;
  }
}
