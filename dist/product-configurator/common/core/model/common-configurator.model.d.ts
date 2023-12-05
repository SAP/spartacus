export declare namespace CommonConfigurator {
    /**
     * Specifies the owner of a product configuration
     */
    interface Owner {
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
    interface ReadConfigurationFromCartEntryParameters {
        userId?: string;
        cartId?: string;
        cartEntryNumber?: string;
        owner: CommonConfigurator.Owner;
    }
    interface ReadConfigurationFromOrderEntryParameters {
        userId?: string;
        orderId?: string;
        orderEntryNumber?: string;
        owner: CommonConfigurator.Owner;
    }
    /**
     * Possible types of owners: Product, cart or order entry
     */
    enum OwnerType {
        PRODUCT = "product",
        CART_ENTRY = "cartEntry",
        ORDER_ENTRY = "orderEntry"
    }
}
/**
 * Possible configurator types
 */
export declare const enum ConfiguratorType {
    CPQ = "CLOUDCPQCONFIGURATOR",
    VARIANT = "CPQCONFIGURATOR",
    TEXTFIELD = "TEXTFIELD"
}
/**
 * Statuses that can occur in the generic configuration
 * status summary
 */
export declare enum OrderEntryStatus {
    Success = "SUCCESS",
    Info = "INFO",
    Warning = "WARNING",
    Error = "ERROR"
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
export declare enum ConfigurationInfoFields {
    KEY = "KEY",
    NAME = "NAME",
    QTY = "QTY",
    FORMATTED_PRICE = "FORMATTED_PRICE",
    PRICE_VALUE = "PRICE_VALUE"
}
/**
 *
 * An enum representing ConfigurationInfo special fields.
 */
export declare enum ConfigurationInfoSpecialFields {
    VERSION = "CI#@#VERSION",
    CURRENCY = "CI#@#CURRENCY",
    LINE_ITEM = "LI",
    LINE_ITEM_DELIMITER = "#"
}
