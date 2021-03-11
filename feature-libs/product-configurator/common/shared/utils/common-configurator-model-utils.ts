import { CommonConfigurator } from '@spartacus/product-configurator/common';

/**
 * Compiles a unique key for a configuration owner from id and type
 * @param owner Specifies the owner of a product configuration
 * @returns Owner key
 */
export function getOwnerKey(
  ownerType: CommonConfigurator.OwnerType | undefined,
  ownerId: string | undefined
): string {
  if (ownerType === CommonConfigurator.OwnerType.PRODUCT) {
    if (!ownerId) {
      throw new Error('We expect a product code!');
    }
  } else if (ownerType === CommonConfigurator.OwnerType.CART_ENTRY) {
    if (!ownerId) {
      throw new Error('We expect a document entry Id!');
    }
  } else if (ownerType === CommonConfigurator.OwnerType.ORDER_ENTRY) {
    if (!ownerId) {
      throw new Error('We expect a document entry Id!');
    }
  } else {
    throw new Error('We expect an owner type!');
  }
  return ownerType + '/' + ownerId;
}

export function createInitialOwner(): CommonConfigurator.Owner {
  return { key: 'INITIAL' };
}
