export declare namespace OccConfiguratorTextfield {
    /**
     * An interface representing the textfield configuration consumed through OCC.
     */
    interface Configuration {
        configurationInfos: ConfigurationInfo[];
    }
    interface ConfigurationInfo {
        configurationLabel?: string;
        configurationValue?: string;
        status?: string;
        configuratorType?: string;
    }
    interface AddToCartParameters {
        userId?: string;
        cartId?: string;
        product?: AddToCartProductData;
        quantity?: number;
        configurationInfos?: ConfigurationInfo[];
    }
    interface UpdateCartEntryParameters {
        userId?: string;
        cartId?: string;
        cartEntryNumber?: string;
        configurationInfos?: ConfigurationInfo[];
    }
    interface AddToCartProductData {
        code?: string;
    }
}
