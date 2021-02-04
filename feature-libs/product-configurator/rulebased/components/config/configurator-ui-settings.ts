export abstract class ConfiguratorUISettings {
  rulebasedConfigurator: {
    quantityDebounceTime?: number;
    inputDebounceTime?: number;
  };
}

export const DefaultConfiguratorUISettings: ConfiguratorUISettings = {
  rulebasedConfigurator: {
    quantityDebounceTime: 750,
    inputDebounceTime: 500,
  },
};
