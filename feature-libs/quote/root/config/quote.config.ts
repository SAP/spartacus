import '@spartacus/core';

export interface QuoteConfig {}

declare module '@spartacus/core' {
  interface Config {
    quote?: QuoteConfig;
  }
}
