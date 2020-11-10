export namespace Cpq {
  /**
   *
   * An interface representing the models used for the communication with the CPQ configurator
   */
  export interface AccessData {
    /**
     * CPQ Access token
     */
    token?: string;
    /**
     * Token expiration time in milli seconds
     */
    tokenExpirationTime?: number;
    /**
     * CPQ endpoint url
     */
    endpoint?: string;
  }
}
