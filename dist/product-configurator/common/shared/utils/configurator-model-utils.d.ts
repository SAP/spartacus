import { CommonConfigurator } from '../../core/model/common-configurator.model';
export declare class ConfiguratorModelUtils {
    /**
     * Compiles a unique key for a configuration owner from id and type
     * @param owner Specifies the owner of a product configuration
     * @returns Owner key
     */
    static getOwnerKey(ownerType?: CommonConfigurator.OwnerType, ownerId?: string): string;
    /**
     * Creates an initial owner object
     * @returns Initial owner
     */
    static createInitialOwner(): CommonConfigurator.Owner;
    /**
     * Checks if an owner is an initial one
     * @param owner Owner
     * @returns Is owner initial?
     */
    static isInitialOwner(owner: CommonConfigurator.Owner): boolean;
    /**
     * Creates a configuration owner object based on its essential attributes
     * @param ownerType Owner type (Does it refer to product, cart or order?)
     * @param ownerId Owner identifier
     * @param configuratorType Configurator type
     * @returns Owner
     */
    static createOwner(ownerType: CommonConfigurator.OwnerType, ownerId: string, configuratorType?: string): CommonConfigurator.Owner;
}
