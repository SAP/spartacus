import { GenericConfigurator } from './generic-configurator.model';

export namespace ConfiguratorTextfield {
  export interface Configuration {
    configurationInfos: ConfigurationInfo[];
    owner?: GenericConfigurator.Owner;
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
