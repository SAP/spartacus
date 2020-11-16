/**
 *
 * An interface representing the models used for the communication with the CPQ configurator
 */
export namespace Cpq {
  /**
   *
   * Authorization data required for communicating with CPQ
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
   * Response of create configuration requests
   */
  export interface ConfigurationCreatedResponseData {
    /**
     * CPQ configuration ID of the newly created configuration
     */
    configId: string;
    /**
     * CPQ session ID in which the configuration was created
     */
    sessionId: string;
  }

  /**
   * An interface representing the CPQ configuration.
   */
  export interface Configuration {
    productSystemId: string;
    productName?: string;
    tabs?: Tab[];
    attributes?: Attribute[];
    conflictMessages?: string[];
    numberOfConflicts?: number;
  }

  /**
   *
   * An interface representing the CPQ configuration tab.
   */
  export interface Tab {
    id: number;
    name?: string;
    displayName?: string;
    isIncomplete?: boolean;
    isSelected?: boolean;
  }

  /**
   *
   * An interface representing the CPQ configuration attribute.
   */
  export interface Attribute {
    pA_ID: number;
    name?: string;
    description?: string;
    displayAs: number;
    incomplete?: boolean;
    selected?: boolean;
    label?: string;
    stdAttrCode: number;
    quantity?: number;
    isEnabled?: boolean;
    isLineItem?: boolean;
    values?: Value[];
  }

  /**
   *
   * An interface representing the CPQ configuration attribute value.
   */
  export interface Value {
    paV_ID: number;
    productSystemId: string;
    valueDisplay?: string;
    description?: string;
    selected?: boolean;
    price?: number;
    quantity?: number;
    valueCode?: string;
  }
}
