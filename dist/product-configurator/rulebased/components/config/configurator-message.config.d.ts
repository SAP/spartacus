export interface ProductConfiguratorMessageConfig {
    updateConfigurationMessage?: {
        waitingTime?: number;
    };
}
export declare abstract class ConfiguratorMessageConfig {
    productConfigurator?: ProductConfiguratorMessageConfig;
}
