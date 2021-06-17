import {
  CommonConfigurator,
  ConfiguratorType,
} from '../../core/model/common-configurator.model';

const initialIndicator = 'INITIAL';
export class ConfiguratorModelUtils {
  /**
   * Compiles a unique key for a configuration owner from id and type
   * @param owner Specifies the owner of a product configuration
   * @returns Owner key
   */
  static getOwnerKey(
    ownerType?: CommonConfigurator.OwnerType,
    ownerId?: string
  ): string {
    if (!ownerId || !ownerType) {
      throw new Error('We expect an owner ID and an owner type');
    }
    return ownerType + '/' + ownerId;
  }

  /**
   * Creates an initial owner object
   * @returns Initial owner
   */
  static createInitialOwner(): CommonConfigurator.Owner {
    return {
      key: initialIndicator,
      configuratorType: initialIndicator,
      id: initialIndicator,
      type: CommonConfigurator.OwnerType.PRODUCT,
    };
  }
  /**
   * Checks if an owner is an initial one
   * @param owner Owner
   * @returns Is owner initial?
   */
  static isInitialOwner(owner: CommonConfigurator.Owner): boolean {
    return owner.configuratorType === initialIndicator;
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
