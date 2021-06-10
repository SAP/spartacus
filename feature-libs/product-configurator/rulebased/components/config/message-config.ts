export abstract class MessageConfig {
  productConfigurator: {
    updateConfigurationMessage?: {
      waitingTime?: number;
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends MessageConfig {}
}
