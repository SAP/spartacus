/**
 * An interface representing the models used for the communication with the OCC part of the CPQ configurator
 */
export namespace OccCpqConfigurator {
  export interface AddToCartParameters {
    userId?: string;
    cartId?: string;
    product?: AddToCartProductData;
    quantity?: number;
    configId?: string;
  }

  export interface AddToCartProductData {
    code?: string;
  }
}
