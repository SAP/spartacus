export namespace ConfiguratorTextfield {
  export interface Configuration {
    configurationInfos: ConfigurationInfo[];
  }

  export interface ConfigurationInfo {
    configurationLabel?: string;
    configurationValue?: string;
  }
}
