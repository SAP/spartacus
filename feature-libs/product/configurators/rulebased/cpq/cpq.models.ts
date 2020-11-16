export namespace Cpq {
  /**
   *
   * An interface representing the models used for the communication with the CPQ configurator
   */
  export interface AccessData {
    /**
     * CPQ Access token
     */
    accessToken?: string;
    /**
     * Token expiration time in milli seconds
     */
    tokenExpirationTime?: number;
    /**
     * CPQ endpoint url
     */
    endpoint?: string;
  }

  /**
   *
   * An interface representing the CPQ configuration .
   */
  export interface Configuration {
    productSystemId: string;
    productName?: string;
    tabs?: Tab[];
    attributes?: Attribute[];
    rootProduct?: string;
  }

  export interface Tab {
    id: number;
    name?: string;
    displayName?: string;
    isIncomplete?: boolean;
    isSelected?: boolean;
  }

  export interface Attribute {
    pA_ID: number;
    name?: string;
    description?: string;
    values?: Value[];
  }

  export interface Value {
    paV_ID: number;
    productSystemId: string;
    description?: string;
    selected?: boolean;
    price: number;
    quantity: number;
  }

}
