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
}
