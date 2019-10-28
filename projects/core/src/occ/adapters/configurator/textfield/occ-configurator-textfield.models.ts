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
  }
}
