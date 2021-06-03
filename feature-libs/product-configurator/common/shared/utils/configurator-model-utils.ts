import {
  CommonConfigurator,
  ConfiguratorType,
} from '../../core/model/common-configurator.model';

export class ConfiguratorModelUtils {
  /**
   * Compiles a unique key for a configuration owner from id and type
   * @param owner Specifies the owner of a product configuration
   * @returns Owner key
   */
  static getOwnerKey(
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

  /**
   * Creates an initial owner object
   * @returns Initial owner
   */
  static createInitialOwner(): CommonConfigurator.Owner {
    return { key: 'INITIAL', configuratorType: 'INITIAL' };
  }

  /**
   * Creates a configuration owner object based on its essential attributes
   * @param ownerType Owner type (Does it refer to product, cart or order?)
   * @param ownerId Owner identifier
   * @param configuratorType Configurator type
   * @returns Owner
   */
  static createOwner(
    ownerType: CommonConfigurator.OwnerType,
    ownerId: string,
    configuratorType: string = ConfiguratorType.VARIANT
  ): CommonConfigurator.Owner {
    return {
      type: ownerType,
      id: ownerId,
      configuratorType: configuratorType,
      key: ConfiguratorModelUtils.getOwnerKey(ownerType, ownerId),
    };
  }
}
