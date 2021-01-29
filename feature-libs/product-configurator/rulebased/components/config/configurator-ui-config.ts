export abstract class ConfiguratorUIConfig {
  rulebasedConfigurator: {
    quantityDebounceTime?: number;
    inputDebounceTime?: number;
  };
}

export const DefaultConfiguratorUIConfig: ConfiguratorUIConfig = {
  rulebasedConfigurator: {
    quantityDebounceTime: 750,
    inputDebounceTime: 500,
  },
};
