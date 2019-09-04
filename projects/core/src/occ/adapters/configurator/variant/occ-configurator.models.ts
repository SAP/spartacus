export namespace OccConfigurator {
  /**
   *
   * An interface representing the variant configuration consumed through OCC.
   */
  export interface Configuration {
    /**
     * @member {string} [configId]
     */
    configId?: string;
    /**
     * @member {boolean} [complete]
     */
    complete?: boolean;

    groups?: Group[];
  }

  export interface Group {
    cstics?: Characteristic[];
  }

  export interface Characteristic {
    name?: string;
    langdepname?: string;
  }
}
