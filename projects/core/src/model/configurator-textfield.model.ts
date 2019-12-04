export namespace ConfiguratorTextfield {
  export interface Configuration {
    configurationInfos: ConfigurationInfo[];
  }

  export interface ConfigurationInfo {
    configurationLabel?: string;
    configurationValue?: string;
    status?: string;
  }

  export interface AddToCartParameters {
    userId: string;
    cartId: string;
    productCode: string;
    quantity: number;
    configuration?: Configuration;
  }
}
