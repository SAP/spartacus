import { CommonConfigurator } from '@spartacus/product-configurator/common';

export namespace ConfiguratorTextfield {
  /**
   * Textfield configuration. Consists of a list of attributes and the configuration owner
   */
  export interface Configuration {
    configurationInfos: ConfigurationInfo[];
    owner: CommonConfigurator.Owner;
  }
  /**
   * Represents a textfield configuration attribute. Carries a label, an alphanumeric value and a status
   */
  export interface ConfigurationInfo {
    configurationLabel: string;
    configurationValue?: string;
    status?: ConfigurationStatus;
  }
  /**
   * Textfield configuration status
   */
  export enum ConfigurationStatus {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
  }

  /**
   * Collection of parameters needed to add a textfield product to the cart
   */
  export interface AddToCartParameters {
    userId: string;
    cartId: string;
    productCode: string;
    quantity: number;
    configuration?: Configuration;
  }
  /**
   * Collection of parameters needed to update the configuration that is attached
   * to a cart entry
   */
  export interface UpdateCartEntryParameters {
    userId: string;
    cartId: string;
    cartEntryNumber: string;
    configuration?: Configuration;
  }
}
