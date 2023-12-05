/**
 * An interface representing the models used for the communication with the OCC part of the CPQ configurator
 */
export declare namespace OccCpqConfigurator {
    interface AddToCartParameters {
        userId?: string;
        cartId?: string;
        product?: AddToCartProductData;
        quantity?: number;
        configId?: string;
    }
    interface AddToCartProductData {
        code?: string;
    }
    interface UpdateConfigurationForCartEntryParameters {
        userId?: string;
        cartId?: string;
        configId: string;
        entryNumber: string;
    }
}
