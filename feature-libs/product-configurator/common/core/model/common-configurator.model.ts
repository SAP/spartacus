export namespace CommonConfigurator {
  /**
   * Specifies the owner of a product configuration
   */
  export interface Owner {
    /**
     * Type of the owner, can be product or document related
     */
    type: OwnerType;
    /**
     * Specifies an owner uniquely, is used as key in the configuration store
     */
    key: string;
    /**
     * Business identifier of the owner.
     * Can be a product code, a cart entry number, or an order code with order entry number
     */
    id: string;
    /**
     * Configurator type. Derived from the cxRoute
     */
    configuratorType: string;
  }

  export interface ReadConfigurationFromCartEntryParameters {
    userId?: string;
    cartId?: string;
    cartEntryNumber?: string;
    owner: CommonConfigurator.Owner;
  }

  export interface ReadConfigurationFromOrderEntryParameters {
    userId?: string;
    orderId?: string;
    orderEntryNumber?: string;
    owner: CommonConfigurator.Owner;
  }
  /**
   * Possible types of owners: Product, cart or order entry
   */
  export enum OwnerType {
    PRODUCT = 'product',
    CART_ENTRY = 'cartEntry',
    ORDER_ENTRY = 'orderEntry',
  }
}

/**
 * Possible configurator types
 */
export const enum ConfiguratorType {
  CPQ = 'CLOUDCPQCONFIGURATOR',
  VARIANT = 'CPQCONFIGURATOR',
  TEXTFIELD = 'TEXTFIELD',
}

/**
 * Statuses that can occur in the generic configuration
 * status summary
 */
export enum OrderEntryStatus {
  Success = 'SUCCESS',
  Info = 'INFO',
  Warning = 'WARNING',
  Error = 'ERROR',
}

/**
 * Status Summary
 */
export interface StatusSummary {
  numberOfIssues?: number;
  status?: OrderEntryStatus;
}

/**
 * Configuration information attached to a cart or order entry.
 * Does not reflect the entire configuration but gives only a summary,
 * in order to better identify different configurations in a cart or order.
 */
export interface ConfigurationInfo {
  configurationLabel?: string;
  configurationValue?: string;
  configuratorType?: string;
  status?: string;
}

/**
 *
 * An enum representing ConfigurationInfo fields.
 */
export enum ConfigurationInfoFields {
  KEY = 'KEY',
  NAME = 'NAME',
  QTY = 'QTY',
  FORMATTED_PRICE = 'FORMATTED_PRICE',
  PRICE_VALUE = 'PRICE_VALUE',
}

/**
 *
 * An enum representing ConfigurationInfo special fields.
 */
export enum ConfigurationInfoSpecialFields {
  VERSION = 'CI#@#VERSION',
  CURRENCY = 'CI#@#CURRENCY',
  LINE_ITEM = 'LI',
  LINE_ITEM_DELIMITER = '#',
}
