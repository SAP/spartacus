export namespace OccConfiguratorTextfield {
  /**
   * An interface representing the textfield configuration consumed through OCC.
   */
  export interface Configuration {
    configurationInfos: ConfigurationInfo[];
  }

  export interface ConfigurationInfo {
    configurationLabel?: string;
    configurationValue?: string;
    status?: string;
    configuratorType?: string;
  }

  export interface AddToCartParameters {
    userId?: string;
    cartId?: string;
    product?: AddToCartProductData;
    quantity?: number;
    configurationInfos?: ConfigurationInfo[];
  }

  export interface UpdateCartEntryParameters {
    userId?: string;
    cartId?: string;
    cartEntryNumber?: string;
    configurationInfos?: ConfigurationInfo[];
  }

  export interface AddToCartProductData {
    code?: string;
  }
}
